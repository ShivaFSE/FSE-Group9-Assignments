//
//  NetworkManagerable.swift
//  Railman
//
//  Created by iShiva on 3/25/23.
//
// MARK: NetworkManagerable

import Foundation

protocol NetworkManagerable: AnyObject {
    func dictionary(from request: URLRequest,
                    session: URLSession,
                    jsonReadingOptions: JSONSerialization.ReadingOptions,
                    completion: @escaping (Result<[String: Any], NetworkManagerError>) -> Void)
    func array(from request: URLRequest,
                    session: URLSession,
                    jsonReadingOptions: JSONSerialization.ReadingOptions,
                    completion: @escaping (Result<[[String: Any]], NetworkManagerError>) -> Void)
    func codable<Value>(_ type: Value.Type,
                        from request: URLRequest,
                        session: URLSession,
                        completion: @escaping (Result<Value, NetworkManagerError>) -> Void) where Value: Codable
}

extension NetworkManagerable {
    func dictionary(from request: URLRequest,
                    jsonReadingOptions: JSONSerialization.ReadingOptions = .mutableContainers,
                    completion: @escaping (Result<[String: Any], NetworkManagerError>) -> Void) {
        dictionary(from: request,
                   session: .shared,
                   jsonReadingOptions: jsonReadingOptions,
                   completion: completion)
    }
    
    func array(from request: URLRequest,
                    jsonReadingOptions: JSONSerialization.ReadingOptions = .mutableContainers,
                    completion: @escaping (Result<[[String: Any]], NetworkManagerError>) -> Void) {
        array(from: request,
                   session: .shared,
                   jsonReadingOptions: jsonReadingOptions,
                   completion: completion)
    }
    
    func codable<Value>(_ type: Value.Type,
                        from request: URLRequest,
                        completion: @escaping (Result<Value, NetworkManagerError>) -> Void) where Value: Codable {
        codable(type, from: request, session: .shared, completion: completion)
    }
}

// MARK: NetworkManager Errors

enum NetworkManagerError: Error {
    case dataTask(error: Error)
    case emptyData
    case jsonSerialization(error: Error)
    case castingError(value: Any, isNot: Any)
    case networkMangerIsNotExists
    case jsonDecoding(error: Error)
    
    func getCastingValue() -> Any {
        switch self {
        case .castingError(let value, _):
            return value
        default:
            return false
        }
    }
}
