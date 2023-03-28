//
//  RailLabel.swift
//  Railman
//
//  Created by iShiva on 3/25/23.
//

import UIKit

class RailLabel: UILabel {

    override init(frame: CGRect) {
            super.init(frame: frame)
            setup()
        }
        
        required init?(coder: NSCoder) {
            super.init(coder: coder)
            setup()
        }
        
        private func setup() {
            self.textColor = Colors.text
            self.translatesAutoresizingMaskIntoConstraints = false
        }

}
