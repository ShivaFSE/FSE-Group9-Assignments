//
//  CartModel.swift
//  Railman
//
//  Created by iShiva on 3/26/23.
//

import Foundation

struct CartModel: Decodable, Encodable {
    let menu_item_id: Int
    let customer_id: String
    let restaurant_id: Int
    let id: Int
}

