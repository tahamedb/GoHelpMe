import express from 'express';
const router = express.Router();
router.get('/test', (req, res) => {
    res.send('sost route working');
});
router.post('/test', (req, res) => {
    res.send('post route working');
    console.log("checked"); 
});
router.put('/test', (req, res) => {
    res.send('post route working');
});
router.delete('/test', (req, res) => {
    res.send('post route working');
});
export default router;