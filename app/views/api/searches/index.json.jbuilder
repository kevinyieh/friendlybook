@search_results.each do |res|
    json.set! res.id do 
        json.extract! res, :id, :first_name, :last_name
    end
end