import './CheckoutRow.css'

const CheckoutRow = (product) => {
    const totalPrice = product.option.price*product.quantity

          return (
              <div className="checkout-row">
                <p><b>{product.product.name}</b></p>
                <p className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">Color <span>{product.option.color}</span></p>
                <p className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">Quantity <span>{product.quantity}</span></p>
                <p className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">Price <span><b>${totalPrice}</b></span></p>
              </div>
              

          )
      
}

export default CheckoutRow