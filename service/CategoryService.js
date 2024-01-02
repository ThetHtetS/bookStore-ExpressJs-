
    let Categories = require('../model/Category');
  
    const getAllCategories = async ()=>
    {
        return Categories.find();
    };
   
    const newCategory = async(category)=>
    {
        const newCategory = new Categories(category);
        return newCategory.save();
    }
   
    const getCategoryById= async (CategoryId)=>{
        return Categories.findById(CategoryId);
    }
   
    async function updateCategory(categoryId,category)
    {
        let updateCategory = await Categories.findByIdAndUpdate(categoryId,category,{new:true});
        return updateCategory;
    }
    
    async function deleteCategory(categoryId)
    {
        let deletedCategory = await Categories.findByIdAndDelete(categoryId);
        return deletedCategory;
    }

    const getTotalCategory = async( )=>{
        const length = await Categories.countDocuments();
        console.log("length", length);
        return length;
    }
    module.exports = {
        getAllCategories,
        newCategory,
        getCategoryById,
        updateCategory,
        deleteCategory,
        getTotalCategory,
    }