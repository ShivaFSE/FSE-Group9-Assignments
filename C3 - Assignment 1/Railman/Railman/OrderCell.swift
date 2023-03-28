//
//  OrderCell.swift
//  Railman
//
//  Created by iShiva on 3/27/23.
//

import UIKit

class OrderCell: UITableViewCell {

    var logo = UIImageView(image: UIImage(named: "OrderLogo"))
    var name = UILabel()
    var price = UILabel()
    var date = UILabel()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)

        logo.translatesAutoresizingMaskIntoConstraints = false
        name.translatesAutoresizingMaskIntoConstraints = false
        price.translatesAutoresizingMaskIntoConstraints = false
        date.translatesAutoresizingMaskIntoConstraints = false
        
        name.font = UIFont.boldSystemFont(ofSize: 15.0)
        price.textColor = UIColor.gray
        date.textColor = UIColor.gray

        contentView.addSubview(logo)
        contentView.addSubview(name)
        contentView.addSubview(price)
        contentView.addSubview(date)

        let viewsDict = [
            "logo" : logo,
            "name" : name,
            "price" : price,
            "date" : date,
            ] as [String : Any]

        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-[logo(70)]", options: [], metrics: nil, views: viewsDict))
        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:|-10-[name]-10-[price]-5-[date]-30-|", options: [], metrics: nil, views: viewsDict))
        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-[logo]-10-[name]-|", options: [], metrics: nil, views: viewsDict))
        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-[logo]-10-[price]-|", options: [], metrics: nil, views: viewsDict))
        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-[logo]-10-[date]-|", options: [], metrics: nil, views: viewsDict))
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

}
