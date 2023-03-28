//
//  NetworkManager.swift
//  Railman
//
//  Created by iShiva on 3/25/23.
//
// MARK: NetworkManager

import Foundation

class NetworkManager {
    private func data(from request: URLRequest,
                      session: URLSession,
                      completion: @escaping (Result<Data, NetworkManagerError>) -> Void) {
        let task = session.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(.dataTask(error: error)))
                return
            }
            guard let data = data else {
                completion(.failure(.emptyData))
                return
            }
            completion(.success(data))
        }
        task.resume()
    }
}

// MARK: NetworkManagerable

extension NetworkManager: NetworkManagerable {
    func codable<Value>(_ type: Value.Type,
                        from request: URLRequest,
                        session: URLSession,
                        completion: @escaping (Result<Value, NetworkManagerError>) -> Void)
                        where Value : Decodable, Value : Encodable {
        data(from: request, session: session) { result in
            switch result {
            case let .success(data):
                do {
                    let codableValue = try JSONDecoder().decode(Value.self, from: data)
                    completion(.success(codableValue))
                } catch let error {
                    return completion(.failure(.jsonDecoding(error: error)))
                }
            case let .failure(error):
                return completion(.failure(error))
            }
        }
    }
    
    func dictionary(from request: URLRequest,
                    session: URLSession = .shared,
                    jsonReadingOptions: JSONSerialization.ReadingOptions = .mutableContainers,
                    completion: @escaping (Result<[String: Any], NetworkManagerError>) -> Void) {
        data(from: request, session: session) { result in
            switch result {
            case let .success(data):
                do {
                    let json = try JSONSerialization.jsonObject(with: data, options: jsonReadingOptions)
                    guard let dictionary = json as? [String: Any] else {
                        completion(.failure(.castingError(value: json, isNot: [String: Any].self)))
                        return
                    }
                    return completion(.success(dictionary))
                    
                } catch let error {
                    return completion(.failure(.jsonSerialization(error: error)))
                }
            case let .failure(error):
                return completion(.failure(error))
            }
        }
    }
    
    func array(from request: URLRequest,
                    session: URLSession = .shared,
                    jsonReadingOptions: JSONSerialization.ReadingOptions = .mutableContainers,
                    completion: @escaping (Result<[[String: Any]], NetworkManagerError>) -> Void) {
        data(from: request, session: session) { result in
            switch result {
            case let .success(data):
                do {
                    let json = try JSONSerialization.jsonObject(with: data, options: jsonReadingOptions)
                    guard let array = json as? [[String: Any]] else {
                        completion(.failure(.castingError(value: json, isNot: [[String: Any]].self)))
                        return
                    }
                    return completion(.success(array))
                    
                } catch let error {
                    return completion(.failure(.jsonSerialization(error: error)))
                }
            case let .failure(error):
                return completion(.failure(error))
            }
        }
    }
}
