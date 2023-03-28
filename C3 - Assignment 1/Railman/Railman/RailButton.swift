//
//  RailButton.swift
//  Railman
//
//  Created by iShiva on 3/25/23.
//

import UIKit

class RailButton: UIButton {

    required init(value: Int = 0) {
        super.init(frame: .zero)
        backgroundColor = Colors.text
        translatesAutoresizingMaskIntoConstraints = false
        var configuration = UIButton.Configuration.plain()
        configuration.background.backgroundColor = Colors.text
        configuration.baseForegroundColor = Colors.highlightedText
        configuration.contentInsets.top = 5
        configuration.contentInsets.bottom = 5
        configuration.contentInsets.leading = 20
        configuration.contentInsets.trailing = 20
        self.configuration = configuration
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

}
