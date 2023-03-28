//
//  CurrentUser.swift
//  Railman
//
//  Created by iShiva on 3/25/23.
//

import Foundation

struct UserModel: Decodable {
    let name: String
    let email: String
    let address: String
    let city: String
    let id: Int
    let phone: String
    let pincode: String
    let role: String
}
