//
//  OrdersScreen.swift
//  Railman
//
//  Created by iShiva on 3/27/23.
//

import UIKit

class OrdersScreen: UITableViewController, UINavigationBarDelegate {

    var orders: [OrderModel] = []
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.addNavigationBar()
        self.loadOrdersData()
        
        self.tableView.register(OrderCell.self, forCellReuseIdentifier: "OrderCell")
    }
    
    func loadOrdersData() {
        DispatchQueue.global(qos: .background).async {
            RailNetworking.getAllOrders(forCustomer: RailUtils.loggedInUser?.id ?? 0) { response in
                print("AllOrders status: \(String(describing: response))")
                if response != nil {
                    self.orders = response as! [OrderModel]
                    
                    //Sort orders by latest
                    let dateFormatter = DateFormatter()
                    dateFormatter.dateFormat = "yyyy-MM-dd HH:mm"
                    self.orders = self.orders.sorted(by: { dateFormatter.date(from: "\($0.order_date) \($0.time)")!.compare(dateFormatter.date(from: "\($1.order_date) \($1.time)")!) == .orderedDescending })
                    
                    //Show all cart from response
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
        return self.orders.count
    }
    
    override func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let headerView = UIView()
        return headerView
    }

    override func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 75
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "OrderCell", for: indexPath) as! OrderCell

        if self.orders.count > indexPath.row {
            let order = self.orders[indexPath.row]
            cell.name.text = order.restaurant_name
            cell.price.text = order.order_total
            cell.date.text = order.order_date
        }

        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        
        //Show full details for the selected order
        let vc = OrderDetailsScreen()
        vc.order = self.orders[indexPath.row]
        self.navigationController?.pushViewController(vc, animated: true)
    }

    func addNavigationBar() {
        let height: CGFloat = 75
        let navbar = UINavigationBar(frame: CGRect(x: 0, y: 0, width: UIScreen.main.bounds.width, height: height))
        navbar.backgroundColor = UIColor.white
        navbar.delegate = self

        let navItem = UINavigationItem()
        navItem.title = "Orders"
        navbar.items = [navItem]

        self.tableView.addSubview(navbar)
        self.tableView.sectionHeaderHeight = 75
    }

}
