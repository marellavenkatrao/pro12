const http = require('http');

const PORT = process.env.PORT || 5002;
const BASE_URL = `http://127.0.0.1:${PORT}`;

function request(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                let parsed = null;
                try {
                    parsed = JSON.parse(body);
                } catch (e) {
                    parsed = body;
                }
                resolve({ status: res.statusCode, data: parsed });
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function runTests() {
    console.log('--- Starting To-Do List API Tests ---');
    let totalScore = 0;
    const testUserId = 'user_test_' + Date.now();
    let createdTaskId = null;

    try {
        // Test 1: POST /api/tasks – create a task with title, description, priority
        console.log('\n[Test 1] POST /api/tasks – create a task with title, description, priority');
        const newTaskPayload = {
            userId: testUserId,
            title: 'Complete Lab Assignment',
            description: 'Implement CRUD operations in Express and MongoDB',
            priority: 'High',
            category: 'Study',
            dueDate: new Date(Date.now() + 86400000).toISOString()
        };
        const postRes = await request('POST', '/api/tasks', newTaskPayload);
        if (postRes.status === 201 && postRes.data && postRes.data._id && postRes.data.title === newTaskPayload.title) {
            console.log('PASS: Task created successfully (Status: 201)');
            console.log('Created Task ID:', postRes.data._id);
            createdTaskId = postRes.data._id;
            totalScore += 5;
        } else {
            console.error('FAIL: Could not create task', postRes);
        }

        // Test 2: GET /api/tasks/:userId – retrieve all tasks for a user
        console.log(`\n[Test 2] GET /api/tasks/${testUserId} – retrieve all tasks for a user`);
        const getRes = await request('GET', `/api/tasks/${testUserId}`);
        if (getRes.status === 200 && Array.isArray(getRes.data) && getRes.data.length >= 1) {
            console.log(`PASS: Retrieved ${getRes.data.length} task(s) for user (Status: 200)`);
            totalScore += 5;
        } else {
            console.error('FAIL: Could not retrieve user tasks', getRes);
        }

        // Test 3: PUT /api/tasks/:id – update a task (e.g., mark as completed)
        console.log(`\n[Test 3] PUT /api/tasks/${createdTaskId} – update a task (mark as completed)`);
        const updatePayload = {
            completed: true,
            priority: 'Medium'
        };
        const putRes = await request('PUT', `/api/tasks/${createdTaskId}`, updatePayload);
        if (putRes.status === 200 && putRes.data && putRes.data.completed === true && putRes.data.priority === 'Medium') {
            console.log('PASS: Task updated successfully (Status: 200, completed: true)');
            totalScore += 5;
        } else {
            console.error('FAIL: Could not update task', putRes);
        }

        // Test 4: DELETE /api/tasks/:id – delete a task
        console.log(`\n[Test 4] DELETE /api/tasks/${createdTaskId} – delete a task`);
        const deleteRes = await request('DELETE', `/api/tasks/${createdTaskId}`);
        if (deleteRes.status === 200 && deleteRes.data && deleteRes.data.message === 'Task deleted successfully') {
            console.log('PASS: Task deleted successfully (Status: 200)');
            totalScore += 5;
        } else {
            console.error('FAIL: Could not delete task', deleteRes);
        }

        console.log('\n========================================');
        console.log(`Total Score: ${totalScore} / 20 points`);
        console.log('========================================');

        if (totalScore === 20) {
            console.log('ALL TESTS PASSED SUCCESSFULLY! ✓');
            process.exit(0);
        } else {
            console.error('SOME TESTS FAILED');
            process.exit(1);
        }
    } catch (err) {
        console.error('Test execution error:', err);
        process.exit(1);
    }
}

// Ensure the server is listening before running tests
function waitForServer(retries = 20, delay = 500) {
    return new Promise((resolve, reject) => {
        const attempt = (n) => {
            const req = http.get(BASE_URL, (res) => {
                resolve();
            });
            req.on('error', () => {
                if (n <= 0) return reject(new Error('Server did not start in time'));
                setTimeout(() => attempt(n - 1), delay);
            });
        };
        attempt(retries);
    });
}

(async () => {
    try {
        await waitForServer();
        await runTests();
    } catch (err) {
        console.error('Error connecting to server:', err.message);
        process.exit(1);
    }
})();
