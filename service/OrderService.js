const Orders = require('../model/Order');
const APIFeatures = require('../utils/apiFeatures');

const getAllOrders = async req => {
  const features = new APIFeatures(
    Orders.find().populate({
      path: 'orderItem',
      populate: { path: 'book' }
    }),
    req.query
  )

    .filter()
    .sort()
    .limitFields()
    .paginate();
  return await features.query;
};

const save = async Order => {
  const newOrder = new Orders(Order);
  const order = await newOrder.save();
  return order;
};

const getOrderById = async OrderId => {
  const order = Orders.findById(OrderId).populate({
    path: 'orderItem',
    populate: { path: 'book' }
  });
  return order;
};

const getOrderByUid = async id => {
  const order = Orders.find({ uid: id }).populate({
    path: 'orderItem',
    populate: { path: 'book' }
  });
  return order;
};

async function updateOrder(id, order) {
  const updatedOrder = await Orders.findByIdAndUpdate(id, order, {
    new: true
  }).populate({
    path: 'orderItem',
    populate: { path: 'book' }
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
  getTotalOrder
};
