//
//  RailConstants.swift
//  Railman
//
//  Created by iShiva on 3/25/23.
//

import Foundation
import UIKit

struct Colors {
    static let tint = UIColor.init(red: 38/255.0, green: 47/255.0, blue: 144/255.0, alpha: 1)
    static let text = UIColor.init(red: 38/255.0, green: 47/255.0, blue: 144/255.0, alpha: 1)
    static let highlightedText = UIColor.init(red: 212/255.0, green: 212/255.0, blue: 212/255.0, alpha: 1)
}

class RailUtils {
    
    static var loggedInUser: UserModel? = nil
    
    static func getCustomerString(type: Int) -> String {
        if type == 0 {
            return "customer"
        }
        else if type == 1 {
            return "restaurant_owner"
        }
        else {
            return ""
        }
    }
    
    
}

class RailUIUtils {
    static func getCustomerTypesView() -> UISegmentedControl {
        let segmentedControl = UISegmentedControl (items: ["Customer", "Restaurant Owner"])
        segmentedControl.translatesAutoresizingMaskIntoConstraints = false
        segmentedControl.selectedSegmentIndex = 0
        segmentedControl.tintColor = UIColor.white
        segmentedControl.backgroundColor = Colors.tint
        segmentedControl.setTitleTextAttributes([NSAttributedString.Key.foregroundColor: Colors.text], for: .selected)
        segmentedControl.setTitleTextAttributes([NSAttributedString.Key.foregroundColor: UIColor.gray], for: .normal)
        segmentedControl.heightAnchor.constraint(equalToConstant: 25).isActive = true
        return segmentedControl
    }
}

//class ClosureSleeve {
//    let closure: () -> ()
//
//    init(attachTo: AnyObject, closure: @escaping () -> ()) {
//        self.closure = closure
//        objc_setAssociatedObject(attachTo, "[\(arc4random())]", self, .OBJC_ASSOCIATION_RETAIN)
//    }
//
//    @objc func invoke() {
//        closure()
//    }
//}
//
//extension UIControl {
//    func addAction(for controlEvents: UIControl.Event = .primaryActionTriggered, action: @escaping () -> ()) {
//        let sleeve = ClosureSleeve(attachTo: self, closure: action)
//        addTarget(sleeve, action: #selector(ClosureSleeve.invoke), for: controlEvents)
//    }
//}
