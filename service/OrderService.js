let Orders = require('../model/Order');

const getAllOrders = async () => {
  return Orders.find().populate({
    path: 'orderItem',
    populate: { path: 'book' }
  });
};

const newOrder = async Order => {
  const newOrder = new Orders(Order);
  let order = await newOrder.save();
  return order;
};

const getOrderById = async OrderId => {
  let order = Orders.findById(OrderId).populate({
    path: 'orderItem',
    populate: { path: 'book' }
  });
  return order;
};

const getOrderByUid = async id => {
  let order = Orders.find({ uid: id }).populate({
    path: 'orderItem',
    populate: { path: 'book' }
  });
  return order;
};

const getOrderByCreatedDate = async (start, end) => {
  let order = Orders.find({ createdAt: { $gte: start, $lt: end } }).populate({
    path: 'orderItem',
    populate: { path: 'book' }
  });
  console.log(order);

  return order;
};

const getOrderByStatus = async status => {
  console.log('status', status);
  if (!status) {
    let order = Orders.find().populate({
      path: 'orderItem',
      populate: { path: 'book' }
    });
    return order;
  } else {
    let order = Orders.find({ status: status }).populate({
      path: 'orderItem',
      populate: { path: 'book' }
    });
    return order;
  }
};

async function updateOrder(id, order) {
  console.log(order);
  let updatedOrder = await Orders.findByIdAndUpdate(id, order, {
    new: true
  }).populate({
    path: 'orderItem',
    populate: { path: 'book' }
  });
  console.log(updatedOrder);
  return updatedOrder;
}

const getTotalOrder = async () => {
  const length = await Orders.countDocuments();
  console.log('length', length);
  return length;
};

module.exports = {
  getAllOrders,
  newOrder,
  getOrderById,
  updateOrder,
  getOrderByUid,
  getOrderByCreatedDate,
  getOrderByStatus,
  getTotalOrder
};
