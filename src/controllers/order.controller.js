// import order from '../models/order.model.js';
// import handleError from "../middlewares/errors/handleError.js";

// // Create a new order
// const createorder = async (req, res) => {
//     try {
//         // const existing = await order.findOne({ $or: [{ user: req.body.name }, { email: req.body.email }] });
//         // if (existing) {
//         //     return handleError(res, null, "Name or email already exists", 409); // 409 Conflict
//         // }

//         // const order = new order(req.body);
//         // await order.save();

//         // return res.status(201).json( order );
//     } catch (error) {
//         handleError(res, error, "Error in creating order", 500);
//     }
// };

// // Get all orders
// const getAllorders = async (req, res) => {
//     try {
//         const orders = await order.find().lean();

//         if (orders.length === 0) {
//             return res.status(204).send(); // No content
//         }

//         return res.status(200).json( orders );
//     } catch (error) {
//         handleError(res, error, "Error in getting all orders", 500);
//     }
// };

// // Get order by ID
// const getorderById = async (req, res) => {
//     try {
//         const order = await order.findById(req.params.id).lean();

//         if (!order) {
//             return handleError(res, null, "order not found", 404);
//         }

//         return res.status(200).json( order );
//     } catch (error) {
//         handleError(res, error, "Error in getting order by ID", 500);
//     }
// };

// // Update order
// const updateorder = async (req, res) => {
//     try {
//         // const { name, email, password } = req.body;

//         // const existing = await order.findOne({
//         //     $or: [{ name }, { email }],
//         //     _id: { $ne: req.params.id }
//         // });

//         // if (existing) {
//         //     return handleError(res, null, "Name or email already in use by another order", 409); // 409 Conflict
//         // }

//         // const order = await order.findByIdAndUpdate(
//         //     req.params.id,
//         //     { name, email, password },
//         //     { new: true, runValidators: true }
//         // );

//         // if (!order) {
//         //     return handleError(res, null, "order not found", 404);
//         // }

//         // return res.status(200).json( order );
//     } catch (error) {
//         handleError(res, error, "Error in updating order", 500);
//     }
// };

// // Delete order
// const deleteorder = async (req, res) => {
//     try {
//         const order = await order.findByIdAndDelete(req.params.id);

//         if (!order) {
//             return handleError(res, null, "No order found", 404);
//         }

//         return res.status(200).json( "order deleted" );
//     } catch (error) {
//         handleError(res, error, "Error in deleting order", 500);
//     }
// };

// const orderController = {
//     createorder,
//     getAllorders,
//     getorderById,
//     updateorder,
//     deleteorder
// };

// export default orderController;
