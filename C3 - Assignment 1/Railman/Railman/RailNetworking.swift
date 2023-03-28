//
//  RailNetworking.swift
//  Railman
//
//  Created by iShiva on 3/25/23.
//

import Foundation

class RailNetworking {
    
    private static var networkManager: NetworkManagerable = NetworkManager()
    
    static let registrationUrl = "http://localhost:8000/api/authentication/registration"
    static let loginUrl = "http://localhost:8000/api/authentication/registration?email=%@&password=%@&role=%@"
    static let allRestaurantsUrl = "http://localhost:8000/api/core/restaurants?"
    static let getRestaurantDetailsUrl = "http://localhost:8000/restaurants?id=%d"
    static let menuUrl = "http://localhost:8000/menu?restaurant_id=%d"
    static let addItemToCartUrl = "http://localhost:8000/api/core/cart"
    static let getCartItemsUrl = "http://localhost:8000/cart?customer_id=%d"
    static let getMenuItemDetailsUrl = "http://localhost:8000/menu?id=%d&restaurant_id=%d"
    static let deleteCartItemUrl = "http://localhost:8000/api/core/cart?id=%d"
    static let placeOrderUrl = "http://localhost:8000/orders"
    static let getAllOrdersUrl = "http://localhost:8000/orders?customer_id=%d"
    
    
    static func registerUser(withDict: Dictionary<String, Any>, completionHandler: @escaping (Bool) -> Void) -> Void
    {
        if let url = URL(string: String(format: RailNetworking.registrationUrl)) {
            var request = URLRequest(url: url)
            request.httpMethod = "POST"
            request.setValue("Application/json", forHTTPHeaderField: "Content-Type")
            guard let httpBody = try? JSONSerialization.data(withJSONObject: withDict, options: []) else {
                completionHandler(false)
                return
            }
            request.httpBody = httpBody
            
            networkManager.dictionary(from: request) { result in
                if case .success(let count) = result {
                    print("Response registerUser: \(count)")
                    if count.count > 0 {
                        completionHandler(true)
                        return
                    }
                }
                if case .failure(let failure) = result {
                    print("failed: \(failure)")
                }
                completionHandler(false)
            }
        }
    }
    
    static func loginUser(userName: String, password: String, customerType: Int, completionHandler: @escaping (Any?) -> Void) -> Void
    {
        if let url = URL(string: String(format: RailNetworking.loginUrl, userName, password, RailUtils.getCustomerString(type: customerType))) {
            let request = URLRequest(url: url)
            
            networkManager.dictionary(from: request) { result in
                if case .failure(let count) = result {
                    print("Response loginUser: \(count.getCastingValue())")
                    if (count.getCastingValue() as AnyObject).count > 0 {
                        let dict = (count.getCastingValue() as AnyObject).firstObject!
                        do {
                            let user = try JSONDecoder().decode(UserModel.self, from:  JSONSerialization.data(withJSONObject: dict!))
                            completionHandler(user)
                            return
                        } catch {
                            print("error: \(error.localizedDescription)")
                        }
                    }
                    completionHandler(nil)
                }
            }
        }
    }
    
    static func getAllRestaurants(completionHandler: @escaping (Any?) -> Void) -> Void
    {
        if let url = URL(string: String(format: RailNetworking.allRestaurantsUrl)) {
            let request = URLRequest(url: url)
            
            networkManager.codable([RestaurantModel].self, from: request) { result in
                if case .success(let count) = result {
                    print("Response getAllRestaurants: \(count.count)")
                    if count.count > 0 {
                        completionHandler(count)
                        return
                    }
                }
                completionHandler(nil)
            }
        }
    }
    
    static func getMenu(forRestaurant: Int, completionHandler: @escaping (Any?) -> Void) -> Void
    {
        if let url = URL(string: String(format: RailNetworking.menuUrl, forRestaurant)) {
            let request = URLRequest(url: url)
            
            networkManager.codable([MenuModel].self, from: request) { result in
                if case .success(let count) = result {
                    print("Response getMenu: \(count)")
                    if count.count > 0 {
                        completionHandler(count)
                        return
                    }
                }
                completionHandler(nil)
            }
        }
    }
    
    static func addMenuItemToCart(withDict: Dictionary<String, Any>, completionHandler: @escaping (Bool) -> Void) -> Void
    {
        if let url = URL(string: String(format: RailNetworking.addItemToCartUrl)) {
            var request = URLRequest(url: url)
            request.httpMethod = "POST"
            request.setValue("Application/json", forHTTPHeaderField: "Content-Type")
            guard let httpBody = try? JSONSerialization.data(withJSONObject: withDict, options: []) else {
                completionHandler(false)
                return
            }
            request.httpBody = httpBody
            
            networkManager.dictionary(from: request) { result in
                if case .success(let count) = result {
                    print("Response addMenuItemToCart: \(count)")
                    if count.count > 0 {
                        completionHandler(true)
                        return
                    }
                }
                if case .failure(let failure) = result {
                    print("failed: \(failure)")
                }
                completionHandler(false)
            }
        }
    }
    
    static func getCartItems(forCustomer: Int, completionHandler: @escaping (Any?) -> Void) -> Void
    {
        if let url = URL(string: String(format: RailNetworking.getCartItemsUrl, forCustomer)) {
            let request = URLRequest(url: url)
            
            networkManager.codable([CartModel].self, from: request) { result in
                if case .success(let count) = result {
                    print("Response getCartItems: \(count)")
                    if count.count > 0 {
                        completionHandler(count)
                        return
                    }
                }
                completionHandler(nil)
            }
        }
    }
    
    static func getMenuItemDetails(forId: Int, inRestaurant: Int, completionHandler: @escaping (Any?) -> Void) -> Void
    {
        if let url = URL(string: String(format: RailNetworking.getMenuItemDetailsUrl, forId, inRestaurant)) {
            let request = URLRequest(url: url)
            
            networkManager.codable([CartDetailsModel].self, from: request) { result in
                if case .success(let count) = result {
                    print("Response getMenuItemDetails: \(count.count), \(count)")
                    if count.count > 0 {
                        completionHandler((count as AnyObject).firstObject!)
                        return
                    }
                }
                completionHandler(nil)
            }
        }
    }
    
    static func deleteCartItem(withId: Int, completionHandler: @escaping (Bool) -> Void) -> Void
    {
        if let url = URL(string: String(format: RailNetworking.deleteCartItemUrl, withId)) {
            var request = URLRequest(url: url)
            request.httpMethod = "DELETE"
            
            networkManager.dictionary(from: request) { result in
                if case .success(let count) = result {
                    print("Response getMenuItemDetails: \(count.count), \(count)")
                    if count.count > 0 {
                        completionHandler(true)
                        return
                    }
                }
                completionHandler(false)
            }
        }
    }
    
    static func getRestaurantDetails(forId: Int, completionHandler: @escaping (Any?) -> Void) -> Void
    {
        if let url = URL(string: String(format: RailNetworking.getRestaurantDetailsUrl, forId)) {
            let request = URLRequest(url: url)
            
            networkManager.codable([RestaurantModel].self, from: request) { result in
                if case .success(let count) = result {
                    print("Response getRestaurantDetails: \(count), \(count)")
                    if count.count > 0 {
                        completionHandler((count as AnyObject).firstObject!)
                        return
                    }
                }
                completionHandler(nil)
            }
        }
    }
    
    static func placeOrder(withDict: Dictionary<String, Any>, completionHandler: @escaping (Bool) -> Void) -> Void
    {
        if let url = URL(string: String(format: RailNetworking.placeOrderUrl)) {
            var request = URLRequest(url: url)
            request.httpMethod = "POST"
            request.setValue("Application/json", forHTTPHeaderField: "Content-Type")
            guard let httpBody = try? JSONSerialization.data(withJSONObject: withDict, options: []) else {
                completionHandler(false)
                return
            }
            request.httpBody = httpBody
            
            networkManager.dictionary(from: request) { result in
                if case .success(let count) = result {
                    print("Response placeOrder: \(count)")
                    if count.count > 0 {
                        completionHandler(true)
                        return
                    }
                }
                if case .failure(let failure) = result {
                    print("failed: \(failure)")
                }
                completionHandler(false)
            }
        }
    }
    
    static func getAllOrders(forCustomer: Int, completionHandler: @escaping (Any?) -> Void) -> Void
    {
        if let url = URL(string: String(format: RailNetworking.getAllOrdersUrl, forCustomer)) {
            let request = URLRequest(url: url)
            
            networkManager.codable([OrderModel].self, from: request) { result in
                if case .success(let count) = result {
                    print("Response getAllOrders: \(count.count), \(count)")
                    if count.count > 0 {
                        completionHandler(count)
                        return
                    }
                }
                completionHandler(nil)
            }
        }
    }
    
}
