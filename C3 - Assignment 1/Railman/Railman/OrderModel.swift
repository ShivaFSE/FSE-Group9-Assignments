//
//  OrderModel.swift
//  Railman
//
//  Created by iShiva on 3/27/23.
//

import Foundation

struct OrderModel: Codable {
    let restaurant_name: String
    let station_name: String
    let order_date: String
    let time: String
    let order_status: String
    let order_total: String
    let payment_status: String
    let delivered_by: String
    let customer_id: String
    let restaurant_id: Int
    let restaurant_owner_id: String
    let id: Int
    let items: [Int]
    
    private enum CodingKeys : String, CodingKey {
        case restaurant_name = "Restaurant Name"
        case station_name = "Station Name"
        case order_date = "Ordered Date"
        case time = "Time"
        case order_status = "Order Status"
        case order_total = "Order Total"
        case payment_status = "Payment Status"
        case delivered_by = "Delivered By"
        case customer_id
        case restaurant_id
        case restaurant_owner_id
        case id
        case items
    }
}

