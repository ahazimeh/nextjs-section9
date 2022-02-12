import { MongoClient } from "mongodb";
async function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email;
        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' })
            return;
        }
        const adminPassword = encodeURIComponent("12[]aszsa")
        let url = `mongodb+srv://root:${adminPassword}@cluster0.svlvw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

        const client = await MongoClient.connect(url)
        const db = client.db();
        await db.collection('emails').insertOne({ email: userEmail });

        client.close()

        console.log(userEmail)
        res.status(201).json({ message: 'Signed up!' })
    }
}
export default handler;