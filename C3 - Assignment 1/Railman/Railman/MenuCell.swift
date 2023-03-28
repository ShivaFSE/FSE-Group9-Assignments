//
//  MenuCell.swift
//  Railman
//
//  Created by iShiva on 3/26/23.
//

import UIKit

class MenuCell: UITableViewCell {

    var logo = UIImageView(image: UIImage(named: "MenuLogo"))
    var name = UILabel()
    var price = UILabel()
    var timings = UILabel()
    var select = RailButton()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)

        logo.translatesAutoresizingMaskIntoConstraints = false
        name.translatesAutoresizingMaskIntoConstraints = false
        price.translatesAutoresizingMaskIntoConstraints = false
        timings.translatesAutoresizingMaskIntoConstraints = false
        select.translatesAutoresizingMaskIntoConstraints = false
        
        name.font = UIFont.boldSystemFont(ofSize: 15.0)
        price.textColor = UIColor.gray
        timings.textColor = UIColor.gray
        selectionStyle = UITableViewCell.SelectionStyle.none

        contentView.addSubview(logo)
        contentView.addSubview(name)
        contentView.addSubview(price)
        contentView.addSubview(timings)
        contentView.addSubview(select)

        let viewsDict = [
            "logo" : logo,
            "name" : name,
            "price" : price,
            "timings" : timings,
            "select" : select,
            ] as [String : Any]

        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-[logo(100)]", options: [], metrics: nil, views: viewsDict))
        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:|-10-[name]-10-[price]-5-[timings]-30-|", options: [], metrics: nil, views: viewsDict))
        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-[logo]-10-[name]-|", options: [], metrics: nil, views: viewsDict))
        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-[logo]-10-[price]-|", options: [], metrics: nil, views: viewsDict))
        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-[logo]-10-[timings]-|", options: [], metrics: nil, views: viewsDict))
        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:[select]-|", options: [], metrics: nil, views: viewsDict))
        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:[select(30)]-|", options: [], metrics: nil, views: viewsDict))
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

}
