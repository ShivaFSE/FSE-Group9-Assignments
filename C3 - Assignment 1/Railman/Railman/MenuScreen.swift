//
//  MenuScreen.swift
//  Railman
//
//  Created by iShiva on 3/26/23.
//

import UIKit

class MenuScreen: UITableViewController {
    
    var restaurant: RestaurantModel? = nil
    var menu: [MenuModel] = []

    override func viewDidLoad() {
        super.viewDidLoad()
        self.addNavigationButtons()

        navigationItem.title = restaurant?.Name
        self.tableView.register(MenuCell.self, forCellReuseIdentifier: "MenuCell")
        
        DispatchQueue.global(qos: .background).async {
            RailNetworking.getMenu(forRestaurant: self.restaurant?.id ?? 0) { response in
                print("Menu status: \(String(describing: response))")
                if response != nil {
                    self.menu = response as! [MenuModel]
                }
                
                //Show all menu from response
                DispatchQueue.main.async {
                    self.tableView.reloadData()
                }
            }
        }
    }

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.menu.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "MenuCell", for: indexPath) as! MenuCell

        if self.menu.count > indexPath.row {
            let menuItem = self.menu[indexPath.row]
            cell.name.text = menuItem.Name
            cell.price.text = String(format: "₹ %@", menuItem.Price)
            cell.timings.text = menuItem.Timings
            
            cell.select.tag = indexPath.row
            cell.select.setTitle("Add to Cart", for: .normal)
            cell.select.addTarget(self, action: #selector(MenuScreen.onMenuItemSelected(_:)), for: .touchUpInside)
        }

        return cell
    }
    
    @objc func onMenuItemSelected(_ sender: RailButton) {
        print("onMenuItemSelected: \(sender.tag)")
        
        //Add selected menu item to cart by sending details to server
        if self.menu.count > sender.tag, (RailUtils.loggedInUser != nil) {
            
            let menuItem = self.menu[sender.tag]
            
            //Check if the items in cart are already from different restaurant
            RailNetworking.getCartItems(forCustomer: RailUtils.loggedInUser?.id ?? 0) { response in
                print("CartItems status: \(String(describing: response))")
                if response != nil {
                    let cartItems = response as! [CartModel]
                    if cartItems.count > 0 {
                        if cartItems.first?.restaurant_id != menuItem.restaurant_id {
                            //Cart has items already from different restaurant, show error alert
                            DispatchQueue.main.async {
                                let dialogMessage = UIAlertController(title: "Invalid Restaurant", message: "Cart already has items from different Restaurant, please try again", preferredStyle: .alert)
                                let ok = UIAlertAction(title: "OK", style: .default, handler: { (action) -> Void in })
                                dialogMessage.addAction(ok)
                                self.present(dialogMessage, animated: true, completion: nil)
                            }
                            return
                        }
                    }
                }
                
                let cartDict = ["menu_item_id" : menuItem.id, "restaurant_id" : menuItem.restaurant_id, "customer_id" : String(RailUtils.loggedInUser!.id)] as [String : Any]
                
                DispatchQueue.global(qos: .background).async {
                    RailNetworking.addMenuItemToCart(withDict: cartDict) { response in
                        print("Menu item added to cart")
                    }
                }
            }
        }
    }

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
    }
    
    func addNavigationButtons() {
        let cartIcon = UIBarButtonItem(image: UIImage(named: "CartIcon"), style: .done, target: self, action: #selector(onCartClicked))
        let ordersIcon = UIBarButtonItem(title: "Orders", style: .done, target: self, action: #selector(onOrdersClicked))
        self.navigationItem.rightBarButtonItems = [ordersIcon, cartIcon]
    }
    
    @objc func onOrdersClicked(_ sender: Any){
        print("onOrdersClicked")
        
        //Show Orders for the user
        let vc = OrdersScreen()
        self.present(vc, animated: true)
    }
    
    @objc func onCartClicked(_ sender: Any){
        print("onCartClicked")
        
        //Show Cart for the user
        let vc = CartScreen()
        self.present(vc, animated: true)
    }

}
