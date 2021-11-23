import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import webController from "../controllers/webController";
import auctionController from "../controllers/auctionController";
import CRUDWebController from "../controllers/CRUDWebController";
import CRUDBannerController from "../controllers/CRUDBannerController";
import CRUDUserController from "../controllers/CRUDUserController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/get-user', homeController.getUser);
    router.get('/form-user', homeController.formUser);
    router.post('/post-user', homeController.postUser);
    router.get('/edit-user', homeController.editUser);
    router.post('/put-user', homeController.putUser);
    router.get('/delete-user', homeController.deleteUserById);

    //API WEB
    router.post('/api/login', userController.handleLogin);
    router.post('/api/register', userController.handleRegister);
    router.get('/api/get-user', userController.getUser);

    router.get('/api/get-webs', webController.getListWeb);
    router.get('/api/get-banner-by-webId', webController.getBannerByWebId);
    router.get('/api/get-auction-by-banner', auctionController.getAuctionByBanner);

    router.post('/api/postWinAuction', auctionController.postWinAuction);

    router.get('/api/get-your-cart', webController.getYourCart);

    router.get('/api/get-your-order', webController.getYourOrder);

    router.put('/api/checkout', webController.checkoutOrder);

    router.put('/api/recharge', userController.recharge);

    router.get('/api/get-web', webController.getWeb);

    router.get('/api/get-web-by-category', webController.getWebByCategory);

    router.get('/api/get-auction-by-status', webController.getAuctionByStatus);

    //API ADMIN

    //API CRUD Web
    router.get('/admin/api/get-all-web', CRUDWebController.getAllWeb);
    router.post('/admin/api/post-web', CRUDWebController.postWeb);
    router.put('/admin/api/put-web', CRUDWebController.updateWeb);
    router.get('/admin/api/detele-web', CRUDWebController.deleteWeb);

    //API CRUD Banner
    router.get('/admin/api/get-all-banner', CRUDBannerController.getAllBanner);
    router.post('/admin/api/post-banner', CRUDBannerController.postBanner);
    router.put('/admin/api/put-banner', CRUDBannerController.updateBanner);
    router.get('/admin/api/detele-banner', CRUDBannerController.deleteBanner);

    //API CRUD User
    router.get('/admin/api/get-all-user', CRUDUserController.getAllUser);
    router.post('/admin/api/post-user', CRUDUserController.postUser);
    router.put('/admin/api/put-user', CRUDUserController.updateUser);
    router.get('/admin/api/delete-user', CRUDUserController.deleteUser);

    return app.use("/", router);
}

module.exports = initWebRoutes;