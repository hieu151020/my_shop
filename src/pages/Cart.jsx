import React from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { modalActions } from "../redux/slices/modalSlice";
import { toast } from "react-toastify";
import useToggleDialog from "../custom-hooks/useToggleDialog";

import CartItem from "../components/Cart/CartItem";
import { cartActions } from "../redux/slices/cartSlice";
import ModalConfirmDelete from "../components/Modal/ModalConfirmDelete";

const Cart = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
console.log(cartItems);
  const { open, toggle, shouldRender } = useToggleDialog();

  const showModalDeleteProduct = (item) => {
    toggle();
    dispatch(modalActions.getProduct(item));
  };

  const deleteProduct = (id) => {
    dispatch(cartActions.deleteItem(id));
    toast.success("Delete product successfull");
  };

  const HandleIncreaseQuanty = (id) => {
    dispatch(cartActions.increaseQuantity(id));
  };

  const HandleReduceQuanty = (id) => {
    dispatch(cartActions.reduceQuantity(id));
  };

  return (
    <Helmet title="Giỏ hàng">
      <CommonSection title="Giỏ hàng" />
      {totalAmount === 0 ? (
        <h2 className="fs-4 text-center mt-5 mb-5">
          Oops! Giỏ hàng của bạn chưa có sản phẩm nào
          <Col lg="2" style={{ marginLeft: "41%" }}>
            <button className="buy__btn w-100 mt-3">
              <Link to="/shop">Mua hàng ngay</Link>
            </button>
          </Col>
        </h2>
      ) : (
        <section>
          <Container>
            <Row>
              <Col lg="9">
                {
                  <table className="table bordered">
                    <thead>
                      <tr>
                        <th>Ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Xóa</th>
                      </tr>
                    </thead>
                    <CartItem
                      cartItems={cartItems}
                      showModalDeleteProduct={showModalDeleteProduct}
                      HandleIncreaseQuanty={HandleIncreaseQuanty}
                      HandleReduceQuanty={HandleReduceQuanty}
                    />
                  </table>
                }
              </Col>

              <Col lg="3">
                <div>
                  <h6 className="d-flex align-items-center justify-content-between">
                    Tổng đơn hàng
                    <span className="fs-4 fw-bold total__cost">{totalAmount.toLocaleString("vi-VN")}đ</span>
                  </h6>
                </div>
                <div>
                  <button className="buy__btn w-100 ">
                    <Link to="/checkout">Đặt hàng</Link>
                  </button>
                  <button className="buy__btn w-100 mt-3">
                    <Link to="/shop">Tiếp tục mua hàng</Link>
                  </button>
                </div>
              </Col>
            </Row>
          </Container>

          {shouldRender && (
            <ModalConfirmDelete
              open={open}
              toggle={toggle}
              content="xóa sản phẩm"
              onSubmit={deleteProduct}
            />
          )}
        </section>
      )}
    </Helmet>
  );
};

export default Cart;
