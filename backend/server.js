const express = require("express");
const cors = require("cors");

//On génére l'application
const app = express()
app.use(cors())
app.use(express.json())


// On entre les const relative à l'API du chatbot
const API_URL = "https://platform.daijobu.ai/api/llm/test-technique/prompt";
const API_KEY = "sk_daij_QBTMqlVQ34SmPN1OxWPl4NqHqVtYTTe69W87MYeBFn9f2kzbz2DakTkgmNgu";

app.post("/api/chat", async (req, res)=> {
    try {
        // On récupère le prompt et la session_id
        const { prompt, session_id} = req.body
        // On envoite le prompt au chatbot avec les paramètres attendus
        const response = await fetch(API_URL, {
            method:"POST",
            headers : {
                //On renseigne la clé api
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
        // gestion des erreurs
        res.status(500).json({error : e.message})
    }
})

// on fait tourné le serveur sur le port 5000 en local (node server.js)
app.listen(5000, () => console.log("backend sur http://localhost:5000"));