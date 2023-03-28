//
//  CartScreen.swift
//  Railman
//
//  Created by iShiva on 3/26/23.
//

import UIKit

class CartScreen: UITableViewController, UINavigationBarDelegate {
    
    var restaurant: RestaurantModel? = nil
    var cart: [CartModel] = []
    var cartDetails: [CartDetailsModel] = []

    override func viewDidLoad() {
        super.viewDidLoad()

        self.addNavigationBar()
        self.loadCartData()
        
        self.tableView.register(MenuCell.self, forCellReuseIdentifier: "MenuCell")
    }
    
    func loadCartData() {
        
        DispatchQueue.global(qos: .background).async {
            RailNetworking.getCartItems(forCustomer: RailUtils.loggedInUser?.id ?? 0) { response in
                print("CartItems status: \(String(describing: response))")
                if response != nil {
                    self.cart = response as! [CartModel]
                    
                    self.cartDetails = []
                    for cartItem in self.cart {
                        RailNetworking.getMenuItemDetails(forId: cartItem.menu_item_id, inRestaurant: cartItem.restaurant_id) { response in
                            print("getMenuItemDetails : \(String(describing: response))")
                            (response as! CartDetailsModel).cart_id = cartItem.id
                            self.cartDetails.append(response as! CartDetailsModel)
                            print("all cart details: \(self.cartDetails)")
                            
                            //Show all cart from response
                            DispatchQueue.main.async {
                                self.tableView.reloadData()
                            }
                        }
                    }
                    
                    //Get restaurant details for order purposes
                    RailNetworking.getRestaurantDetails(forId: self.cart.first?.restaurant_id ?? 0) { response in
                        print("getRestaurantDetails : \(String(describing: response))")
                        self.restaurant = response as? RestaurantModel
                    }
                }
                else{
                    self.restaurant = nil
                    self.cart = []
                    self.cartDetails = []
                    DispatchQueue.main.async {
                        self.tableView.reloadData()
                    }
                }
            }
        }
    }

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.cartDetails.count
    }

    override func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        var headerView: UIView?
        headerView = UIView(frame: CGRectMake(0, 0, tableView.frame.size.width, 150))
        let restaurantName = UILabel()
        restaurantName.font = UIFont.systemFont(ofSize: 34, weight: .bold)
        restaurantName.textColor = Colors.tint
        restaurantName.text = self.restaurant?.Name ?? ""
        restaurantName.frame = CGRectMake(20, 75, tableView.frame.size.width, 50)
        headerView?.addSubview(restaurantName)
        
        if self.cartDetails.count > 0 {
            let totalAmount = self.cartDetails.map( {Int($0.Price) ?? 0 }).reduce(0, +)
            print("totalAmount: \(totalAmount)")
            
            let orderTotal = UILabel()
            orderTotal.font = UIFont.systemFont(ofSize: 34, weight: .bold)
            orderTotal.textColor = .red
            orderTotal.textAlignment = .right
            orderTotal.text = String(format: "₹ \(totalAmount)")
            orderTotal.frame = CGRectMake(20, 75, tableView.frame.size.width - 40, 50)
            headerView?.addSubview(orderTotal)
        }
        return headerView
    }

    override func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 150
    }
    
    override func tableView(_ tableView: UITableView, viewForFooterInSection section: Int) -> UIView? {
        var footerView: UIView?
        footerView = UIView(frame: CGRectMake(0, 0, tableView.frame.size.width, 50))
        let dunamicButton = UIButton(type: UIButton.ButtonType.system)
        dunamicButton.backgroundColor = Colors.tint
        dunamicButton.setTitle(self.cartDetails.count > 0 ? "Proceed to Payment" : "Cart is Empty", for: .normal)
        dunamicButton.setTitleColor(UIColor.white, for: .normal)
        dunamicButton.bounds = CGRectMake(0, 0, 200, 50)
        dunamicButton.center = footerView!.center
        dunamicButton.addTarget(self, action: #selector(CartScreen.onPlaceOrderSelected(_:)), for: .touchUpInside)
        footerView?.addSubview(dunamicButton)
        return footerView
    }

    override func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        return 50
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "MenuCell", for: indexPath) as! MenuCell

        if self.cartDetails.count > indexPath.row {
            let cartItem = self.cartDetails[indexPath.row]
            cell.name.text = cartItem.Name
            cell.price.text = String(format: "₹ %@", cartItem.Price)
            cell.timings.text = cartItem.Timings
            
            cell.select.tag = indexPath.row
            cell.select.setTitle("Delete", for: .normal)
            cell.select.addTarget(self, action: #selector(CartScreen.onCartItemSelected(_:)), for: .touchUpInside)
        }

        return cell
    }
    
    @objc func onPlaceOrderSelected(_ sender: RailButton) {
        print("onPlaceOrderSelected")
        
        if self.cartDetails.count > 0 {
            self.ProceedWithPayment()
        }
    }
    
    func ProceedWithPayment() {
        let alert = UIAlertController(title: "Card Payment", message: "Enter credit card details to place the order.", preferredStyle: UIAlertController.Style.alert )

        let save = UIAlertAction(title: "Place Order", style: .default) { (alertAction) in
            let cardNumber = alert.textFields![0] as UITextField
            let securityCOde = alert.textFields![1] as UITextField
            if cardNumber.text != "" {
                print("Credit Card number is: \(cardNumber.text!)")
            } else {
                print("Credit Card number is empty")
            }

            if securityCOde.text != "" {
                print("Credit Card security code is: \(securityCOde.text!)")
            } else {
                print("Credit Card security code is empty")
            }
            
            if cardNumber.text != "" && securityCOde.text != "" {
                self.placeOrder()
            }
        }

        alert.addTextField { (textField) in
            textField.placeholder = "Enter Card number"
            textField.textColor = .blue
        }
        alert.addTextField { (textField) in
            textField.placeholder = "Enter Card security code"
            textField.textColor = .red
        }

        alert.addAction(save)
        let cancel = UIAlertAction(title: "Cancel", style: .default) { (alertAction) in }
        alert.addAction(cancel)
        self.present(alert, animated:true, completion: nil)

    }
    
    func placeOrder() {
        let totalAmount = self.cartDetails.map( {Int($0.Price) ?? 0 }).reduce(0, +)
        print("totalAmount: \(totalAmount)")
        
        DispatchQueue.global(qos: .background).async {
            if self.restaurant != nil {
                let formatter = DateFormatter()
                formatter.dateFormat = "yyyy-MM-dd"
                formatter.string(from: Date())
                let date = formatter.string(from: Date())
                formatter.dateFormat = "HH:mm"
                let time = formatter.string(from: Date())
                
                let cartDict = ["Restaurant Name" : self.restaurant!.Name, "Station Name" : self.restaurant!.Address, "Ordered Date" : date, "Time" : time, "Order Status": "Accepted", "Order Total": "₹ \(totalAmount)", "Payment Status": "Completed", "Delivered By": "Mr. India", "customer_id": self.cart.first!.customer_id, "restaurant_id": self.restaurant!.id, "restaurant_owner_id": self.restaurant!.restaurant_owner_id, "items": self.cart.map({ (item: CartModel) -> Int in item.id })]
                
                DispatchQueue.global(qos: .background).async {
                    RailNetworking.placeOrder(withDict: cartDict) { response in
                        print("Order placed")
                        
                        if response {
                            //Order has been placed, delete cart items
                            self.clearCart()
                        }
                    }
                }
            }
        }
    }
    
    func clearCart() {
        for (index, cartItem) in self.cart.enumerated() {
            DispatchQueue.global(qos: .background).async {
                RailNetworking.deleteCartItem(withId: cartItem.id) { response in
                    print("Cart item deleted: \(index)")
                    
                    if self.cart.count == index + 1 {
                        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                            self.loadCartData()
                        }
                    }
                }
            }
        }
    }
    
    @objc func onCartItemSelected(_ sender: RailButton) {
        print("onCartItemSelected: \(sender.tag)")
        
        //Delate selected cart item
        if self.cartDetails.count > sender.tag, (RailUtils.loggedInUser != nil) {
            let cartItem = self.cartDetails[sender.tag]
            
            DispatchQueue.global(qos: .background).async {
                RailNetworking.deleteCartItem(withId: cartItem.cart_id) { response in
                    print("Cart item deleted")
                    
                    DispatchQueue.main.async {
                        self.loadCartData()
                    }
                }
            }
        }
    }
    
    func addNavigationBar() {
        let height: CGFloat = 75
        let navbar = UINavigationBar(frame: CGRect(x: 0, y: 0, width: UIScreen.main.bounds.width, height: height))
        navbar.backgroundColor = UIColor.white
        navbar.delegate = self

        let navItem = UINavigationItem()
        navItem.title = "Cart"
        navbar.items = [navItem]

        self.tableView.addSubview(navbar)
        self.tableView.sectionHeaderHeight = 75
    }

}
