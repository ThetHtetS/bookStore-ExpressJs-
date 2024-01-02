const OrderService = require('../service/OrderService');


async function getAllOrders(req,res,next)
{
    let Orders = await OrderService.getAllOrders();
    return res.json(Orders);
}


const newOrder = async function(req,res,next)
{   
    
    try {
        const Order = await OrderService.newOrder(req.body);
        if(!Order) throw Error('Cannot save Order');
        await res.status(201).json(Order);

    }catch(err)
    { 
        await res.status(400).json({message: err})
    }
}

const getOrderById = async function (req,res,next)
{
    let OrderId = req.params['id'];
    console.log(OrderId);
    try
    {
        let Order = await OrderService.getOrderById(OrderId);
        if(!Order)
        {
            res.status(400).json({
                error: 'Order not found'
            });
        }
        else
        {
            res.json([Order]);
        }
    }
    catch(e)
    {
        res.status(400).json({
            error:'Order not found'
        });
    }
}

const getOrderByUserId = async function (req,res,next)
{
    let OrderId = req.params['id'];
    console.log(OrderId);
    try
    {
        let Order = await OrderService.getOrderByUid(OrderId);
        if(!Order)
        {
            res.status(400).json({
                error: 'Order not found'
            });
        }
        else
        {
            res.json(Order);
        }
    }
    catch(e)
    {
        res.status(400).json({
            error:'Order not found'
        });
    }
}


const getOrderByCreatedDate = async function (req,res,next)
{
    let start = req.body.start;
    let end = req.body.end;
    try
    {
        let Order = await OrderService.getOrderByCreatedDate(start,end);
        if(!Order)
        {
            res.status(400).json({
                error: 'Order not found tt'
            });
        }
        else
        {
            res.json(Order);
        }
    }
    catch(e)
    {
        res.status(400).json({
            error:'Order not found'
        });
    }
}

const getOrderByStatus = async function (req,res,next)
{
  let status = req.body.status;
  console.log("status", status);
    try
    {
        let Order = await OrderService.getOrderByStatus(status);
        if(!Order)
        {
            res.status(400).json({
                error: 'Order not found tt'
            });
        }
        else
        {
            res.json(Order);
        }
    }
    catch(e)
    {
        res.status(400).json({
            error:'Order not found'
        });
    }
}



async function updateOrder(req, res, next) {

    try {
        let Id = req.params['id'];
       
        const Order = await OrderService.updateOrder(Id,req.body);
        if(!Order) throw Error('Cannot update Order');
        await res.status(200).json([Order]);
    }catch(err)
    {
        console.log(err);
        await res.status(400).json({message: err})
    }

}

async function deleteOrder(req, res, next) {

    try {
        let Id = req.params['id'];
      
        const Order = await OrderService.deleteOrder(Id);
        if(!Order) throw Error('Cannot delete Order');
        await res.status(200).json(Order);

    }catch(err)
    {
        console.log(err);
        await res.status(400).json({message: err})
    }
}

module.exports = {
    getAllOrders,
    getOrderById,
    newOrder,
    updateOrder,
    deleteOrder,
    getOrderByUserId,
    getOrderByCreatedDate,
    getOrderByStatus,
};