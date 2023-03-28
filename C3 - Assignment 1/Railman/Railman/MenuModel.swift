//
//  MenuModel.swift
//  Railman
//
//  Created by iShiva on 3/26/23.
//

import Foundation

class MenuModel: Decodable, Encodable {
    let Name: String
    let Logo: String
    let Price: String
    let Timings: String
    let restaurant_owner_id: String
    let restaurant_id: Int
    let id: Int
}
