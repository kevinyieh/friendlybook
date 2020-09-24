@search_results.each do |res|
    json.set! res.id do 
        json.id res.id
        json.firstName res.first_name
        json.lastName res.last_name
    end
end