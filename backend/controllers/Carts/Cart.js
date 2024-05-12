import { User } from "../../models/UsersModel.js";

export const addToCart = async (req, res) => {
  try {
    const email = req.email;
    const { productId } = req.body;

    let findUser = await User.findOne({ email });
    console.log(findUser.cartData[0]);
    if (findUser.cartData[productId] === undefined) {
      findUser.cartData = { ...findUser.cartData, [productId]: 1 };
    } else {
      findUser.cartData[productId] += 1;
    }

    await User.findOneAndUpdate(
      { email },
      { $set: { cartData: findUser.cartData } }
    );
    res.json({
      success: true,
      productId,
      message: "Added",
    });
  } catch (error) {
    res.json({
      success: false,
      errors: error.message,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const email = req.email;
    const { productId, type } = req.params;

    if (type === "one") {
      let findUser = await User.findOne({ email });
      findUser.cartData[productId] -= 1;

      await User.findOneAndUpdate(
        { email },
        {
          $set: {
            cartData: findUser.cartData,
          },
        }
      );
    } else {
      let findUser = await User.findOne({ email });
      findUser.cartData[productId] = 0;

      await User.findOneAndUpdate(
        { email },
        {
          $set: {
            cartData: findUser.cartData,
          },
        }
      );
    }

    res.json({
      success: true,
      productId,
      message: "Removed",
    });
  } catch (error) {
    res.json({
      success: false,
      errors: error.message,
    });
  }
};

export const getCartItem = async (req, res) => {
  try {
    const email = req.email;

    const findUser = await User.findOne({ email });

    res.json({
      success: true,
      cartData: findUser.cartData,
    });
  } catch (error) {
    res.json({
      success: false,
      errors: error.message,
    });
  }
};
