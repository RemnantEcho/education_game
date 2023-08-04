const request = require('supertest');
const assert = require('assert');
const fs = require('fs');
const app = require('./app');

describe("GET /flags", () => {
    test("Return 10 flags to Client", async () => {
        const res = await request(app).get("/flags?amount=10");

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(10);
    });

    test("If amount is not Valid", async () => {
        const res = await request(app).get("/flags?amount=0");

        expect(res.statusCode).toBe(406);
        expect(res.text).toEqual('Error: Invalid Input');
    });

    test("If amount is not Valid", async () => {
        const res = await request(app).get("/flags?amount=as");

        expect(res.statusCode).toBe(406);
        expect(res.text).toEqual('Error: Invalid Input');
    });
});

describe('GET /capitals', () => {
    test("Return 10 capitals to Client", async () => {
        const res = await request(app).get("/capitals?amount=10");
        
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(10);
    });
    
    test("If amount is not Valid", async () => {
        const res = await request(app).get("/capitals?amount=0");

        expect(res.statusCode).toBe(406);
        expect(res.text).toEqual('Error: Invalid Input');
    });
});

describe('GET /history', () => {
    test("Return 10 capitals to Client", async () => {
        const res = await request(app).get("/history?amount=10");
        
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(10);
    });
    
    test("If amount is not Valid", async () => {
        const res = await request(app).get("/history?amount=0");

        expect(res.statusCode).toBe(406);
        expect(res.text).toEqual('Error: Invalid Input');
    });
});


describe('GET /messages', () => {
    test("Returns messages .json", async () => {
        const res = await request(app).get("/messages");
        
        expect(res.statusCode).toBe(200);
    });
    
});

describe('POST /messages', () => {
    test("Sending Message data", async () => {
        const message = {
            "date": "07/21/2023",
            "fName": "FirstName",
            "lName": "LastName",
            "email": "Email@google.com",
            "message": "Message"
        }

        const response = await request(app)
        .post("/messages")
        .send(message)
        .expect(201)

        expect(response.status).toEqual(201);
        expect(response.text).toEqual("Message added");
    });
    
});