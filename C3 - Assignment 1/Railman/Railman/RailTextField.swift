//
//  RailTextField.swift
//  Railman
//
//  Created by iShiva on 3/25/23.
//

import UIKit

class RailTextField: UITextField {

    func setup() {
        self.backgroundColor = UIColor.clear
        let border = CALayer()
        let width = CGFloat(2.0)
        borderStyle = .none
        border.borderColor = UIColor.darkGray.cgColor
        border.frame = CGRect(x: 0, y: self.frame.size.height - width, width: self.frame.size.width, height: self.frame.size.height)
        border.borderWidth = width
        self.layer.addSublayer(border)
        self.layer.masksToBounds = true
        
        autocorrectionType = .no
        autocapitalizationType = .none
        spellCheckingType = .no
        self.translatesAutoresizingMaskIntoConstraints = false
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }
    required public init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setup()
    }
}

extension RailTextField {
    func isValidEmail() -> Bool {
        let regex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
        let emailPredicate = NSPredicate(format: "SELF MATCHES%@", regex)
        return emailPredicate.evaluate(with: self.text)
    }
    
    func isValidPassword() -> Bool {
        let regex = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$"
        let passwordPredicate = NSPredicate(format: "SELF MATCHES%@", regex)
        return passwordPredicate.evaluate(with: self.text)
    }
    
    func hasContent() -> Bool {
        return !(self.text?.isEmpty ?? true)
    }
    
    func isNumber() -> Bool {
        return Double(self.text ?? "") != nil
    }
    
    func isString() -> Bool {
        let regex = "[^A-Za-zÀ-ÖØ-öø-ÿ]"
        let stringPredicate = NSPredicate(format: "SELF MATCHES%@", regex)
        return stringPredicate.evaluate(with: self.text)
    }
    
    func isValidPhoneNumber() -> Bool {
        let types: NSTextCheckingResult.CheckingType = [.phoneNumber]
        guard let detector = try? NSDataDetector(types: types.rawValue) else { return false }
        if let match = detector.matches(in: self.text ?? "", options: [], range: NSMakeRange(0, (self.text ?? "").count)).first?.phoneNumber {
            return match == self.text
        } else {
            return false
        }
    }
    
}
