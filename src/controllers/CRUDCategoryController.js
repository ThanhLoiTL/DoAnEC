import CRUDCategoryService from '../services/CRUDCategoryService';

let getAllCategory = async (req, res) => {
    let allCategory = await CRUDCategoryService.getAllCategory();
    return res.status(200).json({
        allCategory: allCategory ? allCategory : []
    });
}

let postCategory = async (req, res) => {
    let message = await CRUDCategoryService.postCategory(req.body);
    return res.status(200).json(message);
}

let updateCategory = async (req, res) => {
    let message = await CRUDCategoryService.updateCategory(req.body);
    return res.status(200).json(message);
}

let deleteCategory = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(500).json({
            message: "That bai"
        });
    }
    let message = await CRUDCategoryService.deleteCategory(id);
    return res.status(200).json(message);
}

module.exports = {
    getAllCategory: getAllCategory,
    postCategory: postCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
}