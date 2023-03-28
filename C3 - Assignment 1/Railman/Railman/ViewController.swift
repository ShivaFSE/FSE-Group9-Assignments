//
//  ViewController.swift
//  Railman
//
//  Created by iShiva on 3/25/23.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.addNavigationBar()
        self.addLoginView()
    }
    
    func addLoginView() {
        
        //Add description for login details to enter
        view.addSubview(loginDescription)
        loginDescription.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20).isActive = true
        loginDescription.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 100).isActive = true
        
        //Add text filed to enter user name
        view.addSubview(loginUserName)
        loginUserName.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20).isActive = true
        loginUserName.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20).isActive = true
        loginUserName.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 150).isActive = true
        
        //Add text filed to enter password
        view.addSubview(loginPassword)
        loginPassword.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20).isActive = true
        loginPassword.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20).isActive = true
        loginPassword.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 185).isActive = true
        
        //Add UI to select customer type, Customer vs Restaurant Owner
        view.addSubview(loginCustomerTypes)
        loginCustomerTypes.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20).isActive = true
        loginCustomerTypes.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 220).isActive = true
        
        //Add Login button
        view.addSubview(loginButton)
        loginButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20).isActive = true
        loginButton.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 265).isActive = true
        loginButton.addTarget(self, action: #selector(ViewController.onLoginClicked), for: .touchUpInside)
        
        //Add description for register details to enter
        view.addSubview(registerDescription)
        registerDescription.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20).isActive = true
        registerDescription.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 400).isActive = true
        
        //Add Register button
        view.addSubview(registerButton)
        registerButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20).isActive = true
        registerButton.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 430).isActive = true
        registerButton.addTarget(self, action: #selector(ViewController.onRegisterClicked), for: .touchUpInside)
    }
    
    //Process when the Login is clicked
    @objc func onLoginClicked(_ sender: UIButton?) {
        
        if (!loginUserName.isValidEmail() || !loginPassword.isValidPassword()) {
            //Show Alert
            let dialogMessage = UIAlertController(title: "Invalid Input", message: "Please check the login credentials and try again", preferredStyle: .alert)
            let ok = UIAlertAction(title: "OK", style: .default, handler: { (action) -> Void in })
            dialogMessage.addAction(ok)
            self.present(dialogMessage, animated: true, completion: nil)
        }
        else {
            RailNetworking.loginUser(userName: loginUserName.text!, password: loginPassword.text!, customerType: loginCustomerTypes.selectedSegmentIndex) { response in
                print("Login status: \(String(describing: response))")
                RailUtils.loggedInUser = response as? UserModel
                
                DispatchQueue.main.async {
                    //Wrong user credentials
                    if response == nil {
                        let dialogMessage = UIAlertController(title: "Invalid Credentials", message: "Please check the login credentials and try again", preferredStyle: .alert)
                        let ok = UIAlertAction(title: "OK", style: .default, handler: { (action) -> Void in })
                        dialogMessage.addAction(ok)
                        self.present(dialogMessage, animated: true, completion: nil)
                    }
                    else {
                        //Login success, show all Restaurants
                        let vc = RestaurantsScreen()
                        self.navigationController?.pushViewController(vc, animated: true)
                    }
                }
            }
        }
    }
    
    //Process when the Register is clicked
    @objc func onRegisterClicked(_ sender: UIButton?) {
        let vc = RegistrationScreen()
        self.navigationController?.pushViewController(vc, animated: true)
    }

    //Add title bar of the app
    func addNavigationBar() {
        navigationController?.navigationBar.prefersLargeTitles = true
        navigationController?.navigationBar.topItem?.title = "Railman"
        navigationController?.navigationItem.largeTitleDisplayMode = .automatic

        let attributes = [ NSAttributedString.Key.foregroundColor : Colors.tint ]
        navigationController?.navigationBar.largeTitleTextAttributes = attributes
    }
    
    lazy var loginDescription: RailLabel = {
        let label = RailLabel()
        label.text = "Enter below details to login"
        return label
    }()
    
    lazy var loginUserName: RailTextField = {
        let textField = RailTextField()
        textField.placeholder = "Enter user name"
        return textField
    }()
    
    lazy var loginPassword: RailTextField = {
        let textField = RailTextField()
        textField.isSecureTextEntry = true
        textField.placeholder = "Enter password"
        return textField
    }()
    
    lazy var loginCustomerTypes: UISegmentedControl = {
        let segmentedControl = RailUIUtils.getCustomerTypesView()
        return segmentedControl
    }()
    
    lazy var loginButton: RailButton = {
        let button = RailButton()
        button.setTitle("Login", for: .normal)
        return button
    }()
    
    lazy var registerDescription: RailLabel = {
        let label = RailLabel()
        label.text = "New to the app? Register instead.."
        return label
    }()
    
    lazy var registerButton: RailButton = {
        let button = RailButton()
        button.setTitle("Register", for: .normal)
        return button
    }()
    
}

