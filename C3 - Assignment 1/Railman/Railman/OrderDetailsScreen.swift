//
//  OrderDetailsScreen.swift
//  Railman
//
//  Created by iShiva on 3/27/23.
//

import UIKit

class OrderDetailsScreen: UITableViewController {
    
    var order: OrderModel? = nil

    override func viewDidLoad() {
        super.viewDidLoad()
    }

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 0
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 0
    }

}
