import axios from "axios";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";
import { useState } from "react";

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => (
          <OrderSummaryItem
            key={cartItem.productId}
            cartItem={cartItem}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />
        ))}
    </div>
  );
}

function OrderSummaryItem({ cartItem, deliveryOptions, loadCart }) {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const selectedDeliveryOption = deliveryOptions.find(
    (d) => d.id === cartItem.deliveryOptionId
  );

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateCartItem = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, { quantity });
    await loadCart();
    setIsEditing(false);
  };

  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date:{" "}
        {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
          "dddd, MMMM D"
        )}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image" src={cartItem.product.image} />

        <div className="cart-item-details">
          <div className="product-name">{cartItem.product.name}</div>
          <div className="product-price">
            {formatMoney(cartItem.product.priceCents)}
          </div>

          <div className="product-quantity">
            {!isEditing ? (
              <>
                <span>
                  Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                </span>
                <span
                  className="update-quantity-link link-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Update
                </span>
                <span
                  className="delete-quantity-link link-primary"
                  onClick={deleteCartItem}
                >
                  Delete
                </span>
              </>
            ) : (
              <>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {[...Array(10).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <span
                  className="save-quantity-link link-primary"
                  onClick={updateCartItem}
                >
                  Save
                </span>
                <span
                  className="cancel-quantity-link link-primary"
                  onClick={() => {
                    setQuantity(cartItem.quantity);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </span>
              </>
            )}
          </div>
        </div>

        <DeliveryOptions
          cartItem={cartItem}
          deliveryOptions={deliveryOptions}
          loadCart={loadCart}
        />
      </div>
    </div>
  );
}