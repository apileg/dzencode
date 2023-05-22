/**
 * @jest-environment node
 */

import axios from "axios"

test("auth test", async () => {
    const response = await axios.post("http://localhost:3001/api/auth", {
        email: "incorrectemail@gmail.com",
        password: "password",
    })

    expect(response).toBe({
        type: "error",
    })
})
