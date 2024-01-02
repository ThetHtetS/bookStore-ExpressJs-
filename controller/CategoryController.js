const CategoryService = require('../service/CategoryService');


async function getAllCategories(req,res,next)
{
    let categories = await CategoryService.getAllCategories();
    return res.json(categories);
}


const newCategory = async function(req,res,next)
{
    try {
        const movie = await CategoryService.newCategory(req.body);
        if(!movie) throw Error('Cannot save movie');
        await res.status(201).json(movie);

    }catch(err)
    { 
        await res.status(400).json({message: err})
    }
}

const getCategoryById = async function (req,res,next)
{
    let CategoryId = req.params['id'];
    try
    {
        let category = await CategoryService.getCategoryById(CategoryId);
        if(!category)
        {
            res.status(400).json({
                error: 'Category not found'
            });
        }
        else
        {
            res.json(todo);
        }
    }
    catch(e)
    {
        res.status(400).json({
            error:'ToDo not found'
        });
    }
}


async function updateCategory(req, res, next) {

    try {
        let categoryId = req.params['id'];
        console.log('Id ',categoryId, ' todo ',req.body)
        const category = await CategoryService.updateCategory(categoryId,req.body);
        if(!category) throw Error('Cannot update category');
        await res.status(200).json(category);
    }catch(err)
    {
        console.log(err);
        await res.status(400).json({message: err})
    }

}

async function deleteCategory(req, res, next) {

    try {
        let categoryId = req.params['id'];
        console.log('Id ',categoryId, ' todo ',req.body)
        const category = await CategoryService.deleteCategory(categoryId);
        if(!category) throw Error('Cannot delete category');
        await res.status(200).json(category);

    }catch(err)
    {
        console.log(err);
        await res.status(400).json({message: err})
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    newCategory,
    updateCategory,
    deleteCategory,
};