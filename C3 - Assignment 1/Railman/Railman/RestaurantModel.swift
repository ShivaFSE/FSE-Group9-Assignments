//
//  RestaurantModel.swift
//  Railman
//
//  Created by iShiva on 3/26/23.
//

import Foundation

struct RestaurantModel: Decodable, Encodable {
    let Name: String
    let Logo: String
    let Address: String
    let Timings: String
    let Description: String
    let restaurant_owner_id: String
    let id: Int
}

