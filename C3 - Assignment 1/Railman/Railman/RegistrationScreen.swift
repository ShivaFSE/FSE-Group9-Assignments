//
//  RegistrationScreen.swift
//  Railman
//
//  Created by iShiva on 3/27/23.
//

import UIKit

class RegistrationScreen: UIViewController {
    
    var isValidationSuccessful = false

    override func viewDidLoad() {
        super.viewDidLoad()
        
        navigationItem.title = "Registration"
        self.navigationController?.navigationBar.topItem?.backButtonTitle = "Back"
        
        self.loadRegistrationForm()
    }
    
    func loadRegistrationForm() {
        view.backgroundColor = .white
        view.addSubview(scrollView)
        scrollView.addSubview(scrollViewContainer)
        
        scrollViewContainer.addArrangedSubview(registrationDescription)
        scrollViewContainer.addArrangedSubview(name)
        scrollViewContainer.addArrangedSubview(email)
        scrollViewContainer.addArrangedSubview(password)
        scrollViewContainer.addArrangedSubview(verifyPassword)
        scrollViewContainer.addArrangedSubview(address)
        scrollViewContainer.addArrangedSubview(city)
        scrollViewContainer.addArrangedSubview(pincode)
        scrollViewContainer.addArrangedSubview(phoneNumber)
        scrollViewContainer.addArrangedSubview(errorDescription)
        scrollViewContainer.addArrangedSubview(registerButton)
        
        registerButton.addTarget(self, action: #selector(RegistrationScreen.onRegisterClicked), for: .touchUpInside)
        registerButton.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        registerButton.heightAnchor.constraint(equalToConstant: 40).isActive = true

        scrollView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20).isActive = true
        scrollView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20).isActive = true
        scrollView.topAnchor.constraint(equalTo: view.topAnchor).isActive = true
        scrollView.bottomAnchor.constraint(equalTo: view.bottomAnchor).isActive = true

        scrollViewContainer.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor).isActive = true
        scrollViewContainer.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor).isActive = true
        scrollViewContainer.topAnchor.constraint(equalTo: scrollView.topAnchor, constant: 50).isActive = true
        scrollViewContainer.bottomAnchor.constraint(equalTo: scrollView.bottomAnchor).isActive = true
        scrollViewContainer.widthAnchor.constraint(equalTo: scrollView.widthAnchor).isActive = true
    }
    
    @objc func onRegisterClicked(_ sender: UIButton?) {
        print("In onRegisterClicked")
        
        if !isValidationSuccessful {
            self.textFieldDidChange(RailTextField())
            return
        }
        
        //All validation successful, send user details
        let cartDict = ["name" : name.text ?? "", "email" : email.text ?? "", "password" : password.text ?? "", "phone" : phoneNumber.text ?? "", "address" : address.text ?? "", "city" : city.text ?? "", "role" : RailUtils.getCustomerString(type: 0), "pincode" : pincode.text ?? ""] as [String : Any]

        DispatchQueue.global(qos: .background).async {
            RailNetworking.registerUser(withDict: cartDict) { response in
                DispatchQueue.main.async {
                    if response {
                        print("Registration successful")
                        self.navigationController?.popViewController(animated: true)
                    }
                    else {
                        let dialogMessage = UIAlertController(title: "Invalid details", message: "Something went wrong, please try again", preferredStyle: .alert)
                        let ok = UIAlertAction(title: "OK", style: .default, handler: { (action) -> Void in })
                        dialogMessage.addAction(ok)
                        self.present(dialogMessage, animated: true, completion: nil)
                    }
                }
            }
        }
    }
    
    let scrollView: UIScrollView = {
        let scrollView = UIScrollView()
        scrollView.backgroundColor = .white
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        return scrollView
    }()
    
    let scrollViewContainer: UIStackView = {
        let stack = UIStackView()
        stack.axis = .vertical
        stack.spacing = 20
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()
    
    lazy var registrationDescription: RailLabel = {
        let label = RailLabel()
        label.text = "Enter below details to register"
        return label
    }()
    
    lazy var name: RailTextField = {
        let textField = RailTextField()
        textField.addTarget(self, action: #selector(self.textFieldDidChange(_:)), for: .editingChanged)
        textField.placeholder = "Enter name  ⃰"
        return textField
    }()
    
    lazy var email: RailTextField = {
        let textField = RailTextField()
        textField.addTarget(self, action: #selector(self.textFieldDidChange(_:)), for: .editingChanged)
        textField.placeholder = "Enter email  ⃰"
        return textField
    }()
    
    lazy var password: RailTextField = {
        let textField = RailTextField()
        textField.addTarget(self, action: #selector(self.textFieldDidChange(_:)), for: .editingChanged)
        textField.isSecureTextEntry = true
        textField.placeholder = "Enter password  ⃰"
        return textField
    }()
    
    lazy var verifyPassword: RailTextField = {
        let textField = RailTextField()
        textField.addTarget(self, action: #selector(self.textFieldDidChange(_:)), for: .editingChanged)
        textField.isSecureTextEntry = true
        textField.placeholder = "Enter password again  ⃰"
        return textField
    }()
    
    lazy var address: RailTextField = {
        let textField = RailTextField()
        textField.addTarget(self, action: #selector(self.textFieldDidChange(_:)), for: .editingChanged)
        textField.placeholder = "Enter Address"
        return textField
    }()
    
    lazy var city: RailTextField = {
        let textField = RailTextField()
        textField.addTarget(self, action: #selector(self.textFieldDidChange(_:)), for: .editingChanged)
        textField.placeholder = "Enter City name  ⃰"
        return textField
    }()
    
    lazy var pincode: RailTextField = {
        let textField = RailTextField()
        textField.addTarget(self, action: #selector(self.textFieldDidChange(_:)), for: .editingChanged)
        textField.placeholder = "Enter Pincode  ⃰"
        return textField
    }()
    
    lazy var phoneNumber: RailTextField = {
        let textField = RailTextField()
        textField.addTarget(self, action: #selector(self.textFieldDidChange(_:)), for: .editingChanged)
        textField.placeholder = "Enter Phone number  ⃰"
        return textField
    }()
    
    lazy var errorDescription: RailLabel = {
        let label = RailLabel()
        label.textColor = .red
        label.numberOfLines = 2
        label.text = ""
        return label
    }()
    
    lazy var registerButton: RailButton = {
        let button = RailButton()
        button.setTitle("Register", for: .normal)
        return button
    }()
    
    @objc func textFieldDidChange(_ textField: UITextField) {
        print("In textFieldDidChange")
        
        self.lowlightTextFields()
        if !name.hasContent() {
            name.borderStyle = .bezel
            errorDescription.text = " ⃰ ⃰ ⃰Enter a valid Name"
            return
        }
        else if !email.isValidEmail() {
            email.borderStyle = .bezel
            errorDescription.text = " ⃰ ⃰ ⃰Enter a valid Email"
            return
        }
        else if !password.isValidPassword() {
            password.borderStyle = .bezel
            errorDescription.text = " ⃰ ⃰ ⃰Enter a valid Password, atleast 6 charecters with a number"
            return
        }
        else if !verifyPassword.isValidPassword() || password.text != verifyPassword.text {
            verifyPassword.borderStyle = .bezel
            errorDescription.text = " ⃰ ⃰ ⃰Enter a matching Password"
            return
        }
        else if !city.hasContent() {
            city.borderStyle = .bezel
            errorDescription.text = " ⃰ ⃰ ⃰Enter a valid City"
            return
        }
        else if !pincode.isNumber() {
            pincode.borderStyle = .bezel
            errorDescription.text = " ⃰ ⃰ ⃰Enter a valid Pincode"
            return
        }
        else if !phoneNumber.isValidPhoneNumber() {
            phoneNumber.borderStyle = .bezel
            errorDescription.text = " ⃰ ⃰ ⃰Enter a valid Phone number"
            return
        }
        
        isValidationSuccessful = true
        errorDescription.text = ""
    }
    
    func lowlightTextFields() {
        name.borderStyle = .none
        email.borderStyle = .none
        password.borderStyle = .none
        verifyPassword.borderStyle = .none
        city.borderStyle = .none
        pincode.borderStyle = .none
        phoneNumber.borderStyle = .none
        
        isValidationSuccessful = false
    }

}
