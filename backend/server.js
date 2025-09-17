const express = require("express");
const cors = require("cors");

const app = express()
app.use(cors())
app.use(express.json())

const API_URL = "https://platform.daijobu.ai/api/llm/test-technique/prompt";
const API_KEY = "sk_daij_QBTMqlVQ34SmPN1OxWPl4NqHqVtYTTe69W87MYeBFn9f2kzbz2DakTkgmNgu";

app.post("/api/chat", async (req, res)=> {
    try {
        const { prompt, session_id} = req.body
        
        const response = await fetch(API_URL, {
            method:"POST",
            headers : {
                "Authorization" : `Bearer ${API_KEY}`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(
                {
                    prompt,
                    session_id,
                    stream : false,
                    rag : false
                    
                }
            )
        })
        const data = await response.json()
        res.json(data)
    }
    catch (e) {
        res.status(500).json({error : e.message})
    }
})
app.listen(5000, () => console.log("backend sur http://localhost:5000"));