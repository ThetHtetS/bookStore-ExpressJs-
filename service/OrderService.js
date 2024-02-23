const Orders = require('../model/Order');
const APIFeatures = require('../utils/apiFeatures');

const getAllOrders = async req => {
  const features = new APIFeatures(Orders.find(), req.query)

    .filter()
    .sort()
    .limitFields()
    .paginate();
  return await features.query;
};

const getOrderMonthly = async year => {
  //const year = req.params.year;
  const orders = await Orders.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        numOrders: { $sum: 1 },
        orders: { $push: '$name' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $limit: 12
    }
  ]);
  return orders;
};

const save = async Order => {
  const order = await Orders.create(Order);

  return order;
};

const getOrderById = async OrderId => {
  const order = Orders.findById(OrderId);
  return order;
};

const getOrderByUid = async id => {
  const order = Orders.find({ uid: id });
  return order;
};

async function updateOrder(id, order) {
  const updatedOrder = await Orders.findByIdAndUpdate(id, order, {
    new: true
  });

  return updatedOrder;
}

const getTotalOrder = async () => {
  const length = await Orders.countDocuments();
  return length;
};

module.exports = {
  getAllOrders,
  save,
  getOrderById,
  updateOrder,
  getOrderByUid,
  getTotalOrder,
  getOrderMonthly
};
