var testOthersJson = '{"AirMainRids":[10521571],"ApartTime":null,"ApplicationState":null,"ApprovalLevel":0,"ApproveDtailList":[],"ApproveWithoutChoose":false,"BookInOrgOrderForAT":false,"BookTime":null,"CanDownloadBill":false,"Car":[],"ContinueBookIsCreateOrder":false,"DateTimeNowString":null,"ErrorMsg":null,"FileUploadTime":null,"HasTicketTimeOut":false,"HideTrainChange":false,"Hotel":[],"Insurances":[],"MainCompanyId":null,"MoreApproversSubmit":false,"Offline_Pay":false,"OrderCustomer":null,"OrderCustomerDetailList":[],"OrderFare":null,"OrderNo":"202009212375","PaidAmount":null,"PaidVatAmount":null,"PayChannel":null,"Segment":[],"ShowApproval":false,"ShowCancel":false,"ShowDelete":false,"ShowGoOnBook":false,"ShowPayment":false,"ShowPaymentByApprovedA":false,"ShowTicket":false,"StartsOn":null,"State":null,"Sundries":[],"TicketTimeOutMessage":null,"Train":[],"TravelRequestNewMiscellList":[],"UploadFileApprove":false,"Vacation":[],"Visa":[],"YeePayInfoAmount":null,"isCompleted":false}';
var res = JSON.parse(testOthersJson);
var isTA = 0
var orderFinishDetail = new OrderFinishDetail(netUserId.split('\"')[1], res.AirMainRids, orderType, 'CN')


function test(){
    airBookOthersPopUp(orderFinishDetail, res.OrderNo, isTA) //确认机票杂项
}