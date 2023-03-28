//
//  RestaurantCell.swift
//  Railman
//
//  Created by iShiva on 3/26/23.
//

import UIKit

class RestaurantCell: UITableViewCell {
    
    var logo = UIImageView(image: UIImage(named: "RestaurantLogo"))
    var name = UILabel()
    var place = UILabel()
    var timings = UILabel()
    var details = UILabel()

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)

        logo.translatesAutoresizingMaskIntoConstraints = false
        name.translatesAutoresizingMaskIntoConstraints = false
        place.translatesAutoresizingMaskIntoConstraints = false
        timings.translatesAutoresizingMaskIntoConstraints = false
        details.translatesAutoresizingMaskIntoConstraints = false
        
        name.font = UIFont.boldSystemFont(ofSize: 25.0)
        place.textColor = UIColor.gray
        timings.textColor = UIColor.gray
        details.textColor = UIColor.gray

        contentView.addSubview(logo)
        contentView.addSubview(name)
        contentView.addSubview(place)
        contentView.addSubview(timings)
        contentView.addSubview(details)

        let viewsDict = [
            "logo" : logo,
            "name" : name,
            "place" : place,
            "timings" : timings,
            "details" : details,
            ] as [String : Any]

        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-[logo]-|", options: [], metrics: nil, views: viewsDict))
        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:|-10-[logo]-5-[name]-10-[place]-5-[timings]-5-[details]-30-|", options: [], metrics: nil, views: viewsDict))
        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-[name]-|", options: [], metrics: nil, views: viewsDict))
        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-[place]-|", options: [], metrics: nil, views: viewsDict))
        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-[timings]-|", options: [], metrics: nil, views: viewsDict))
        contentView.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-[details]-|", options: [], metrics: nil, views: viewsDict))
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

}
