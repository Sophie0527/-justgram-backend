const { readPostingList, readPostingDetail, createPosting, updatePosting, deletePosting} = require('../models/posting');

const readPostController = async (req,res) => {
    const postings = await readPostingList()
    return res.status(200).json({data : postings});
    }


const readPostDetailController = async (req,res) => {
    const postings = await readPostingDetail()
    return res.status(200).json({data : postings});
}


const createPostingController = async (req,res) => {
    const { user_id, contents } = req.body;

    try {
    const createPostingDto = {user_id, contents}
    await createPosting( createPostingDto );
    } catch(err) {
        res.status(500).json({ message: err.message })
        return;
    }
    res.status(201).json({ message: "CREATED" })
}


const updatePostingController = async (req,res) => {
    const {id} = req.params;
    const { contents } = req.body;
    try {
        const updatePostingDto = {id, contents}
        await updatePosting(updatePostingDto)
    } catch(err) {
        res.status(500).json({ message: err.message })
        return;
    }
    return res.status(200).json({ message: "UPDATED" });
}


const deletePostingController = async (req,res) => {
    const {id} = req.params;
    try {
        await deletePosting( id );
    } catch(err) {
        res.status(500).json({ message: err.message })
        return;
    }
    res.status(204).json({ message: "DELETED" })
};


module.exports = {readPostController, readPostDetailController, createPostingController, updatePostingController, deletePostingController};