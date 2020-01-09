import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import { connect } from "react-redux";
import PrivateRoute from "../commonComponents/PrivateRoute";
import HomePage from "../pages/Home";
import ProductViewPage from "../pages/ProductView";
import SignupPage from "../pages/Signup";
import MyCartPage from "../pages/MyCart";
import NotFoundPage from "../pages/NotFound";
import AddStorePage from "../pages/Store/AddStore"
import StoreListPage from "../pages/Store/StoreList"
import ApproveStorePage from "../pages/Store/ApproveStore"
import ProductListPage from "../pages/Product/ProductList"
export const history = createHistory();

const routers = (props) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/view/product/:productId" component={ProductViewPage} />
        <PrivateRoute exact path="/mycart" component={MyCartPage} />
        <PrivateRoute exact path="/store/add" component={AddStorePage} />
        <PrivateRoute exact path="/mystore/list" component={StoreListPage} />
        <PrivateRoute exact path="/store/approve" component={ApproveStorePage} />
        <PrivateRoute exact path="/store/:storeId/product/list" component={ProductListPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = ({ Authentication }) => ({Authentication});

const mapDispatchToProps = {  };

export default connect(mapStateToProps, mapDispatchToProps)(routers);