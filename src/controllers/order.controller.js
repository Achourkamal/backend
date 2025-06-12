import Order from '../models/order.model.js'
import handleError from '../middlewares/errors/handleError.js'
import User from '../models/user.model.js'
import Product from '../models/product.model.js';

const createOrder = async (req, res) => {
    try {
      req.body.status="pending"

        const existingUser = await User.findById(req.body.user);

        if (!existingUser) {
            return handleError(res, null, "The specified user does not exist", 400);
        }

        if (req.body.status !="pending" && req.body.status !="shipped" && req.body.status !="delivered") {
            return handleError(res, null, "invalid status", 400);
        }
        
        if (!Array.isArray(req.body.products)) {
            return handleError(res, null, "Missing or invalid 'products' in the request body.", 400);

}
        const results = await Promise.all(
            req.body.products.map(async (item) => {
                const product = await Product.findById(item.product);
                if (!product) {
                    return handleError(res, null, "the specified product does not exist", 400);
                }

                if (item.quantity < 1) {
                    return handleError(res, null, "The order must have at least one product", 400);
                }

                return product.price * item.quantity;
            }
            )
        );
        const totalPrice = results.reduce((sum, price) => sum + price, 0);
        req.body.totalPrice = totalPrice;

        const newOrder = new Order(req.body);
        await newOrder.save();
        return res.status(201).json(newOrder);

    } catch (error) {
        handleError(res, error, error.message || "Error in creating Order", 500);
    }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.product") // Remplit les détails de chaque produit
      .exec();

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching orders", error });
  }
};

const getOneOrder = async (req, res) => {
  try {
    const order= await Order.findById(req.params.id)
      .populate("products.product")
      .exec();

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching orders", error });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return handleError(res, null, "Order not found", 404);
    }

    const existingUser = await User.findById(req.body.user);
    if (!existingUser) {
      return handleError(res, null, "The specified user does not exist", 400);
    }

    const products = req.body.products;

    // 🔴 1. Vérifier si au moins un produit a une quantité <= 0
    const hasInvalidQuantity = products.some(p => p.quantity <= 0);
    if (hasInvalidQuantity) {
      return handleError(
        res,
        null,
        "All products must have quantity >= 1",
        400
      );
    }

    // 🔴 2. Vérifier les doublons
    const seenProductIds = new Set();
    for (const item of products) {
      const id = item.product.toString();
      if (seenProductIds.has(id)) {
        return handleError(res, null, `Duplicate product ID detected: ${id}`, 400);
      }
      seenProductIds.add(id);
    }

    // 🔴 3. Calculer le total
    const results = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`The specified product (${item.product}) does not exist`);
        }
        return product.price * item.quantity;
      })
    );

    const totalPrice = results.reduce((sum, price) => sum + price, 0);
    req.body.totalPrice = totalPrice;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate("user", "name email")
      .populate("products.product", "name price");

    return res.status(200).json(updatedOrder);
  } catch (error) {
    return handleError(res, error, error.message || "Error in updating Order", 500);
  }
};


const getOrderByIdUser = async (req, res) => {
  try {
    const UserId = req.query.id;

    if (!UserId) {
      return handleError(res, null, "userId missing in query", 400);
    }

    const orders = await Order.find({ user: UserId }).populate("user", "name");

    return res.status(200).json(orders);
  } catch (error) {
    return handleError(res, null, "error in retreiving orders", 500);
  }
};

const getOrderByStatus = async (req, res) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  try {
    const status = req.query.status;
    console.log("status", status)
    const orders = await Order.find({ status: status }).populate(
      "status",
      "status"
    );

    return res.status(200).json(orders);
  } catch (error) {
    return handleError(res, null, "error retreiving order", 500);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return handleError(res, null, "Order not found", 404);
    }

    const status = order.status;
    if (status !== "cancelled") {
      return handleError(
        res,
        null,
        "Cannot delete an order must be cancelled ",
        400
      );
    }

    await Order.findByIdAndDelete(req.params.id);
    return res.status(204).json({ payload: "Order deleted" });
  } catch (error) {
    handleError(res, error, error.message || "Error in deleting Order", 500);
  }
};
const orderController = {
  createOrder,
  getOrders,
  getOneOrder,
  updateOrder,
  getOrderByIdUser,
  getOrderByStatus,
  deleteOrder,
}

export default orderController