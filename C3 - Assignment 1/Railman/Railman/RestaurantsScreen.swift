//
//  RestaurantsScreen.swift
//  Railman
//
//  Created by iShiva on 3/26/23.
//

import UIKit

class RestaurantsScreen: UITableViewController, UISearchBarDelegate {
    
    var restaurants: [RestaurantModel] = []
    var searching = false
    var filteredRestaurants: [RestaurantModel] = []

    override func viewDidLoad() {
        super.viewDidLoad()
        self.addNavigationButtons()
        
        //navigationController?.isNavigationBarHidden = true;
        navigationItem.title = "Restaurants"
        navigationItem.hidesBackButton = true
        navigationItem.titleView = self.searchBar
        
        self.tableView.register(RestaurantCell.self, forCellReuseIdentifier: "RestaurantCell")

        DispatchQueue.global(qos: .background).async {
            RailNetworking.getAllRestaurants() { response in
                print("AllRestaurants status: \(String(describing: response))")
                self.restaurants = response as! [RestaurantModel]
                
                //Login success, show all Restaurants from response
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
        if self.searching {
            return self.filteredRestaurants.count
        }
        else {
            return self.restaurants.count
        }
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "RestaurantCell", for: indexPath) as! RestaurantCell

        var restaurant: RestaurantModel? = nil
        if self.searching {
            if self.filteredRestaurants.count > 0 {
                restaurant = self.filteredRestaurants[indexPath.row]
            }
        }
        else {
            if self.restaurants.count > 0 {
                restaurant = self.restaurants[indexPath.row]
            }
        }
        
        if restaurant != nil {
            cell.name.text = restaurant!.Name
            cell.place.text = restaurant!.Address
            cell.timings.text = restaurant!.Timings
            cell.details.text = restaurant!.Description
        }

        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        
        var restaurant: RestaurantModel? = nil
        if self.searching {
            if self.filteredRestaurants.count > 0 {
                restaurant = self.filteredRestaurants[indexPath.row]
            }
        }
        else {
            if self.restaurants.count > 0 {
                restaurant = self.restaurants[indexPath.row]
            }
        }
        
        //Show menu for the selected Restaurants
        if restaurant != nil {
            let vc = MenuScreen()
            vc.restaurant = restaurant
            self.navigationController?.pushViewController(vc, animated: true)
        }
    }
    
    func addNavigationButtons() {
        let cartIcon = UIBarButtonItem(image: UIImage(named: "CartIcon"), style: .done, target: self, action: #selector(onCartClicked))
        let ordersIcon = UIBarButtonItem(title: "Orders", style: .done, target: self, action: #selector(onOrdersClicked))
        self.navigationItem.rightBarButtonItems = [ordersIcon, cartIcon]
        
        let logoutButton = UIButton.init(type: .custom)
        logoutButton.layer.borderWidth = 1
        logoutButton.layer.borderColor = Colors.tint.cgColor
        var configuration = UIButton.Configuration.plain()
        configuration.background.backgroundColor = .clear
        configuration.background.cornerRadius = 5
        configuration.baseForegroundColor = Colors.tint
        configuration.title = "Logout"
        configuration.contentInsets.top = 5
        configuration.contentInsets.bottom = 5
        configuration.contentInsets.leading = 10
        logoutButton.configuration = configuration
        logoutButton.addTarget(self, action: #selector(self.onLogoutClicked), for: .touchUpInside)
        
        self.navigationItem.leftBarButtonItem = UIBarButtonItem(customView: logoutButton)
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
    
    @objc func onLogoutClicked(_ sender: Any){
        print("onLogoutClicked")
        
        //Logout the user and show login screen
        self.navigationController?.popViewController(animated: true)
    }
    
    lazy var searchBar: UISearchBar = {
        let search = UISearchBar()
        search.searchBarStyle = UISearchBar.Style.default
        search.placeholder = "Search..."
        search.sizeToFit()
        search.isTranslucent = false
        search.delegate = self
        return search
    }()
    
    @objc func searchBar(_ searchBar: UISearchBar, textDidChange textSearched: String)
    {
        print("searchBar textDidChange: \(textSearched)")
        self.filteredRestaurants = self.restaurants.filter { $0.Name.lowercased().prefix(textSearched.count) == textSearched.lowercased() }
        self.searching = true
        self.tableView.reloadData()
    }
    
    func searchBarCancelButtonClicked(_ searchBar: UISearchBar) {
        print("searchBarCancelButtonClicked")
        self.searching = false
        searchBar.text = ""
        self.tableView.reloadData()
    }

}
