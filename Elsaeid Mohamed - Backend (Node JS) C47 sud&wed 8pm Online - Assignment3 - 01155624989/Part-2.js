const http = require('http');
const fs = require('fs');

const filePath = './users.json';

const readUsers = () => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf-8');
    return data ? JSON.parse(data) : []; 
};

const writeUsers = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2)); 
};

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });

    const method = req.method;
    const url = req.url;

    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const parsedBody = body ? JSON.parse(body) : null;

        // 4. API to get all users (GET /user)
        if (url === '/user' && method === 'GET') {
            const users = readUsers();
            res.end(JSON.stringify(users));
            return;
        }

        // 1. API to add a new user (POST /user)
        if (url === '/user' && method === 'POST') {
            const users = readUsers();
            
            const emailExists = users.some(u => u.email === parsedBody.email);
            if (emailExists) {
                res.end(JSON.stringify({ message: "Email already exists." }));
                return;
            }

            const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
            
            const newUser = {
                id: newId,
                name: parsedBody.name,
                age: parsedBody.age,
                email: parsedBody.email
            };

            users.push(newUser);
            writeUsers(users);

            res.end(JSON.stringify({ message: "User added successfully." }));
            return;
        }

        // 2. API to update user (PATCH /user/:id)
        if (url.startsWith('/user/') && method === 'PATCH') {
            // بنجيب الـ ID من اللينك
            const id = parseInt(url.split('/')[2]);
            const users = readUsers();
            
            const userIndex = users.findIndex(u => u.id === id);

            if (userIndex !== -1) {
                users[userIndex] = { ...users[userIndex], ...parsedBody };
                writeUsers(users);
                
                res.end(JSON.stringify({ message: "User updated successfully." }));
            } else {
                res.end(JSON.stringify({ message: "User ID not found." }));
            }
            return;
        }

        // 3. API to delete user (DELETE /user/:id)
        if (url.startsWith('/user/') && method === 'DELETE') {
            const id = parseInt(url.split('/')[2]);
            const users = readUsers();
            
            const userIndex = users.findIndex(u => u.id === id);

            if (userIndex !== -1) {
                users.splice(userIndex, 1);
                writeUsers(users);
                
                res.end(JSON.stringify({ message: "User deleted successfully." }));
            } else {
                res.end(JSON.stringify({ message: "User ID not found." }));
            }
            return;
        }

        // 5. API to get user by ID (GET /user/:id)
        if (url.startsWith('/user/') && method === 'GET') {
            const id = parseInt(url.split('/')[2]);
            const users = readUsers();
            
            // بندور على اليوزر
            const user = users.find(u => u.id === id);

            if (user) {
                // لو لقيناه، بنطبع بياناته
                res.end(JSON.stringify(user));
            } else {
                // لو ملقيناهوش
                res.end(JSON.stringify({ message: "User not found." }));
            }
            return;
        }

        res.end(JSON.stringify({ message: "Route not found" }));
    });
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});