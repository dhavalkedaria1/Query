let  screenzaa=(data)=>{
    let q1=`
    <div style="background-color:yellow;color:black;">----------------Lookup Query----------------</div></br>
    select user_name, Count(lookup_log.id) as lookup_count from api_log.lookup_log</br>
    inner join identity.user on lookup_log.added_by_user_id = identity.user.id</br>
    where DATE(lookup_log.added_on) = '${data}' and lookup_log.mode_id = 1 and</br>
    identity.user.user_type_id = 2 group by identity.user.id;</br></br></br>
    
    <div style="background-color:yellow;color:black;">--------------simulutaion_File_Count-------------------</div></br>
    select user_name,Count(*) as simulation_Count from screening_config.simulation</br>
    inner join identity.user on</br>
    simulation.added_by_user_id=identity.user.id</br>
    where DATE(simulation.updated_on) = '${data}' and simulation.screening_mode = 4</br>
    group by identity.user.id;</br></br></br>
    
    <div style="background-color:yellow;color:black;">----Simulation Count:</div></br>
    select count(1) from api_log.lookup_log</br>
    where DATE(added_on) =  '${data}' and mode_id = 4;</br></br></br>
    
    <div style="background-color:yellow;color:black;">---------------bulksearch_File_count_----------------------</div></br>
    select user_name,Count(*) as bulksearch_Count from screening_config.simulation </br>
    inner join identity.user on</br>
    simulation.added_by_user_id=identity.user.id</br>
    where DATE(simulation.updated_on) = '${data}' and simulation.screening_mode in (2,7,8)</br>
    group by identity.user.id;</br></br>


    <div style="background-color:yellow;color:black;">---------------------Bulk Search----------------------</div></br>
    select count(1) as Bulk_Search_Count from api_log.lookup_log where mode_id in (7,8) and date(added_on) = '${data}';</br></br></br>

    <div style="background-color:yellow;color:black;">--------------------AS501 Query----------------------</div></br>
    select added_on, * from api_log.as501_log</br>
    WHERE DATE(added_on) = '${data}';</br></br></br>
    
    
    <div style="background-color:yellow;color:black;">--------------AS501 COUNT---------------</div></br>
    --1) Getting all the TotalAS501 Request Count</br>
    select count(*) as as501_total_count</br>
    from api_log.as501_log</br>
    WHERE DATE(added_on) = '${data}';</br></br>
    
    --2) Getting all the Rejected TotalAS501 Request Count</br>
    select count(*) as as501_rejected_totalcount</br>
    from api_log.as501_log</br>
    WHERE DATE(added_on) = '${data}' and request_status = 3;</br></br>
    
    --3) Getting all the Success TotalAS501 Request Count</br>
    select count(*) as as501_success_totalcount</br>
    from api_log.as501_log</br>
    WHERE DATE(added_on) = '${data}' and request_status = 1;</br></br>
    
    --4) Getting all the Rejected TotalAS501 Request Message with RequestId (For ExcelSheet)</br>
    select request_id, simple_validation_count,</br>
    relational_validation_count, custom_validation_count,</br>
    default_validation, response_body</br>
    from api_log.as501_log</br>
    WHERE DATE(added_on) = '${data}' and request_status = 3;</br></br></br>
    
    <div style="background-color:Orange;color:black;">------->>>>>> Total User and lookup Count <<<<<<<------</div></br>
    ------ 1-for Lookup Count ---------------</br>
    select count(*) as Total_Lookup_Count from api_log.lookup_log where added_on::date ='${data}' and mode_id=1;</br></br>

    ------ 2-for User count---------------</br>
    select count(distinct(added_by_user_id)) from api_log.lookup_log where added_on::date ='${data}' and mode_id=1;</br></br>    


    <div style="background-color:Orange;color:black;">------->>>>>> PURPOSE 03 RELATED INFO QUERY <<<<<<<------</div></br>
    
    <div style="background-color:yellow;color:black;">-------------- PURPOSE 03 Transactions Query --------------</div></br>
    
    --1) Purpose 03 Total Transactions</br>
    select count(id) as purpose_03_total_transactions </br>
    from api_log.lookup_log</br>
    where mode_id in (5)</br>
    and DATE(added_on) = '${data}';</br></br>
    
    --2) Purpose 03 Total Transactions Where Hits are present</br>
    select count(id) as purpose_03_total_transactions_where_hits_present</br>
    from api_log.lookup_log</br>
    where mode_id in (5)</br>
    and total_hits > 0</br>
    and DATE(added_on) = '${data}';</br></br></br>
    
    <div style="background-color:yellow;color:black;">-------------- PURPOSE 03 TOTAL, CONFIRMED, PROBABLE HITS Query --------------</div></br>
    
    --3) Purpose 03 Total Hits (Confirmed + Probable) Count</br>
    select count(total_hits) as purpose_03_total_hits_count  </br>
    from api_log.lookup_log</br>
    where mode_id in (5)</br>
    and total_hits > 0</br>
    and DATE(added_on) = '${data}';</br></br>
    
    --4) Purpose 03 Total Confirmed Hits Count</br>
    select count(confirmed_hits) as purpose_03_total_confirmed_hits_count  </br>
    from api_log.lookup_log</br>
    where mode_id in (5)</br>
    and confirmed_hits > 0</br>
    and DATE(added_on) = '${data}';</br></br>
    
    --5) Purpose 03 Total Probable Hits Count</br>
    select count(probable_hits) as purpose_03_total_probable_hits_count  </br>
    from api_log.lookup_log</br>
    where mode_id in (5)</br>
    and probable_hits > 0</br>
    and DATE(added_on) = '${data}';</br>
    
    <div style="background-color:yellow;color:black;">-------------- PURPOSE 03 HITS AVG, MIN, MAX Query --------------</div></br>
    --6) Purpose 03 Hits Avg Time Taken</br>
    select avg(extract(milliseconds from (end_time - start_time))) as </br>purpose_03_hits_avg_time_in_milliseconds</br>
    from api_log.lookup_log</br>
    where mode_id in (5)</br>
    and total_hits > 0</br>
    and DATE(added_on) = '${data}';</br></br>
    
    --7) Purpose 03 Hits Max Time Taken</br>
    select max(extract(milliseconds from (end_time - start_time))) as </br>purpose_03_hits_max_time_in_milliseconds</br>
    from api_log.lookup_log</br>
    where mode_id in (5)</br>
    and total_hits > 0</br>
    and DATE(added_on) = '${data}';</br></br>
    
    --8) Purpose 03 Hits Min Time Taken</br>
    select min(extract(milliseconds from (end_time - start_time))) as </br>purpose_03_hits_min_time_in_milliseconds</br>
    from api_log.lookup_log</br>
    where mode_id in (5)</br>
    and total_hits > 0</br>
    and DATE(added_on) = '${data}';  </br></br>
    
    <div style="background-color:yellow;color:black;">-------------- PURPOSE 03 NO HITS AVG, MIN, MAX Query --------------</div></br>
    ---9) Purpose 03 No Hits Avg Time</br>
    select avg(extract(milliseconds from (end_time - start_time))) as </br>purpose_03_no_hits_avg_time_in_milliseconds</br>
    from api_log.lookup_log</br>
    where mode_id in (5)</br>
    and total_hits = 0</br>
    and DATE(added_on) = '${data}';</br></br>
    
    --10) Purpose 03 No Hits Max Time</br>
    select max(extract(milliseconds from (end_time - start_time))) as </br>purpose_03_no_hits_max_time_in_milliseconds</br>
    from api_log.lookup_log</br>
    where mode_id in (5)</br>
    and total_hits = 0</br>
    and DATE(added_on) = '${data}';</br>
    
    --11) Purpose 03 No hits Min time</br>
    select min(extract(milliseconds from (end_time - start_time))) as </br>purpose_03_no_hits_min_time_in_milliseconds</br>
    from api_log.lookup_log</br>
    where mode_id in (5)</br>
    and total_hits = 0</br>
    and DATE(added_on) = '${data}'; </br>
    
    <div style="background-color:green;color:black;">-------->>>>>> PURPOSE 01 RELATED INFO QUERY <<<<<<--------------</div></br>
    
    <div style="background-color:yellow;color:black;">-------------- PURPOSE 01 Transactions Query --------------</div></br>
    --12) Purpose 01 Total Transactions</br>
    select count(id) as purpose_03_total_transactions </br>
    from api_log.lookup_log</br>
    where mode_id in (3)</br>
    and DATE(added_on) = '${data}';</br></br></br>
    
    --13) Purpose 01 Total Transactions Where Hits are present</br>
    select count(id) as purpose_03_total_transactions_where_hits_present</br>
    from api_log.lookup_log</br>
    where mode_id in (3)</br>
    and total_hits > 0</br>
    and DATE(added_on) = '${data}';</br></br></br>
    
    <div style="background-color:yellow;color:black;">-------------- PURPOSE 01 TOTAL, CONFIRMED, PROBABLE HITS Query --------------</div></br>
    --14) Purpose 01 Total Hits (Confirmed + Probable) Count</br>
    select count(total_hits) as purpose_01_total_hits_count  </br>
    from api_log.lookup_log</br>
    where mode_id in (3)</br>
    and total_hits > 0</br>
    and DATE(added_on) = '${data}';</br></br>
    
    --15) Purpose 01 Total Confirmed Hits Count</br>
    select count(confirmed_hits) as purpose_01_total_confirmed_hits_count  </br>
    from api_log.lookup_log</br>
    where mode_id in (3)</br>
    and confirmed_hits > 0</br>
    and DATE(added_on) = '${data}';</br></br>
    
    --16) Purpose 01 Total Probable Hits Count</br>
    select count(probable_hits) as purpose_01_total_probable_hits_count  </br>
    from api_log.lookup_log</br>
    where mode_id in (3)</br>
    and probable_hits > 0</br>
    and DATE(added_on) = '${data}';</br></br></br>
    
    <div style="background-color:yellow;color:black;">-------------- PURPOSE 01 HITS AVG, MAX, MIN Query --------------</div></br>
    --17) Purpose 01 Hits Avg Time Taken</br>
    select avg(extract(milliseconds from (end_time - start_time))) as </br>purpose_01_hits_avg_time_in_milliseconds</br>
    from api_log.lookup_log</br>
    where mode_id in (3)</br>
    and total_hits > 0</br>
    and DATE(added_on) = '${data}';</br>
    
    --18) Purpose 01 Hits Max Time Taken</br>
    select max(extract(milliseconds from (end_time - start_time))) as </br>purpose_01_hits_max_time_in_milliseconds</br>
    from api_log.lookup_log</br>
    where mode_id in (3)</br>
    and total_hits > 0</br>
    and DATE(added_on) = '${data}'; </br></br></br>
    
    --19) Purpose 01 Hits Min Time Taken</br>
    select min(extract(milliseconds from (end_time - start_time))) as </br>purpose_01_hits_min_time_in_milliseconds</br>
    from api_log.lookup_log</br>
    where mode_id in (3)</br>
    and total_hits > 0</br>
    and DATE(added_on) = '${data}'; </br></br></br>
    
    
    <div style="background-color:yellow;color:black;">-------------- PURPOSE 01 NO HITS AVG, MAX, MIN Query --------------</div></br>
    ---20) Purpose 01 No Hits Avg Time</br>
    select avg(extract(milliseconds from (end_time - start_time))) as </br>purpose_01_no_hits_avg_time_in_milliseconds</br>
    from api_log.lookup_log</br>
    where mode_id in (3)</br>
    and total_hits = 0</br>
    and DATE(added_on) = '${data}'; </br></br></br>
    
    --21) Purpose 01 No hits Max Time</br>
    select max(extract(milliseconds from (end_time - start_time))) as </br>purpose_01_no_hits_max_time_in_milliseconds</br>
    from api_log.lookup_log</br>
    where mode_id in (3)</br>
    and total_hits = 0</br>
    and DATE(added_on) = '${data}'; </br></br></br>
    
    --22) Purpose 01 No hits Min time</br>
    select min(extract(milliseconds from (end_time - start_time))) as </br>purpose_01_no_hits_min_time_in_milliseconds</br>
    from api_log.lookup_log</br>
    where mode_id in (3)</br>
    and total_hits = 0</br>
    and DATE(added_on) = '${data}'; </br></br></br>
    
    
    —------------------------------Total Data Injestion--------------------------------------------</br>
--1) Data Ingestion (Total No of Request): (AS501 Though data ingestion Total )</br>
select count(*) AS Total_AS501_Request_Through_Data_Ingestion_Frontend</br>
from api_log.as501_log</br>
where data_ingestion_type_id = '2' -- data ingestion - UI</br>
AND DATE(added_on) = '${data}';</br></br>

--2) Getting all the Success AS501 Request Count Through Data Ingestion UI (AS501 Though data ingestion success )</br>
select count(*) as as501_success_count_through_data_ingestion_ui</br>
from api_log.as501_log</br>
WHERE data_ingestion_type_id = '2' --UI</br>
and DATE(added_on) = '${data}'</br>
and request_status = 1;</br></br>

--3) API (Total No of Request) (AS501 through API Total)</br>
select count(*) AS Total_AS501_Request_Through_API</br>
from api_log.as501_log</br>
where data_ingestion_type_id = '1' -- API</br>
AND DATE(added_on) = '${data}';</br></br>

--4) Getting all the Success AS501 Request Count Through API (AS501 through API Success)</br>
select count(*) as as501_success_count_through_api</br>
from api_log.as501_log</br>
WHERE data_ingestion_type_id = '1' --API</br>
and DATE(added_on) = '${data}'</br>
and request_status = 1;</br>
`
    
    return q1
}

let billr=(data)=>{
    let q1=`
    --Query 1 Manual Lookup Count–</br>
select Count(lookup_log.id) as Manual_Lookup_Count</br>
from api_log.lookup_log</br>
where lookup_log.mode_id = 1 -- lookup</br>
AND EXTRACT(YEAR FROM added_on) = 2024</br>
AND EXTRACT(MONTH FROM added_on) = ${data};</br></br></br>


--Query 2 Lookup in Bulk With Case Creation Count --</br>
select Count(lookup_log.id) as Lookup_In_Bulk_With_Case_Creation</br>
from api_log.lookup_log</br>
where lookup_log.mode_id = 8 -- Lookup in Bulk with Case Creation</br>
AND EXTRACT(YEAR FROM added_on) = 2024</br>
AND EXTRACT(MONTH FROM added_on) = ${data};</br></br></br>


--Query 3 Lookup in Bulk Without Case Creation Count--</br>
select Count(lookup_log.id) as Lookup_In_Bulk_Without_Case_Creation</br>
from api_log.lookup_log</br>
where lookup_log.mode_id = 7 -- Lookup in Bulk without Case Creation</br>
AND EXTRACT(YEAR FROM added_on) = 2024</br>
AND EXTRACT(MONTH FROM added_on) = ${data};</br></br></br>


--Query 4 API / Initial Screening (Accepted by TW)--</br>
SELECT COUNT(*) AS API_Initial_OR_Screening_Accepted_By_TW</br>
FROM api_log.as501_log</br>
WHERE purpose in ('01','03')</br>
AND request_status = 1 -- success</br>
AND EXTRACT(YEAR FROM added_on) = 2024</br>
AND EXTRACT(MONTH FROM added_on) = ${data};</br></br></br>


--Query 5 API / Initial Screening (Rejected by TW) - only Validations--</br>
SELECT COUNT(*) AS API_Initial_OR_Screening_Rejected_By_TW</br>
FROM api_log.as501_log</br>
WHERE purpose in ('01','03')</br>
AND request_status = 3 -- failure</br>
AND NOT jsonb_typeof(default_validation) IN ('object')</br>
AND EXTRACT(YEAR FROM added_on) = 2024</br>
AND EXTRACT(MONTH FROM added_on) = ${data};</br></br></br>


--Query 6 API Initial + Continuous (Accepted byTW)--</br>
SELECT COUNT(*) AS API_Initial_AND_Continous_Accepted_By_TW</br>
FROM api_log.as501_log</br>
WHERE purpose in ('01,04','04,01','03,04','04,03')</br>
AND request_status = 1 -- success</br>
AND EXTRACT(YEAR FROM added_on) = 2024</br>
AND EXTRACT(MONTH FROM added_on) = ${data};</br></br></br>


--Query 7 API Initial + Continuous (Rejected byTW)- Only Validations--</br>
SELECT COUNT(*) AS API_Initial_AND_Continous_Rejected_By_TW</br>
FROM api_log.as501_log</br>
WHERE purpose in ('01,04','04,01','03,04','04,03')</br>
AND NOT jsonb_typeof(default_validation) IN ('object')</br>
AND request_status = 3 -- failure</br>
AND EXTRACT(YEAR FROM added_on) = 2024</br>
AND EXTRACT(MONTH FROM added_on) = ${data};</br></br></br>


--Query 8 Customer_Count_API_Continuous_Customer_Created: (only created)--</br>
select count(*) AS Customer_Count_API_Continuous_Customer_Created</br>
from api_log.as501_log</br>
where id IN (</br>
select as501_record_log.as501_log_id</br>
from api_log.as501_record_log</br>
where record_type_id = 1 -- customer</br>
AND record_type_status_id = 1 -- record was inserted'</br>
)</br>
AND request_status = 1 -- success</br>
AND data_ingestion_type_id = '1' -- data ingestion - API</br>
AND EXTRACT(YEAR FROM added_on) = 2024</br>
AND EXTRACT(MONTH FROM added_on) = ${data};</br></br></br>


--Query 9: File upload data ingestion:--</br>
select count(*) AS Customer_Count_Through_Data_Ingestion_Frontend</br>
from api_log.as501_log</br>
where id IN (</br>
select as501_record_log.as501_log_id</br>
from api_log.as501_record_log</br>
where record_type_id = 1 -- customer</br>
AND record_type_status_id = 1 -- record was inserted</br>
)</br>
AND data_ingestion_type_id = '2' -- data ingestion - UI</br>
AND request_status = 1 -- success</br>
AND EXTRACT(YEAR FROM added_on) = 2024</br>
AND EXTRACT(MONTH FROM added_on) = ${data};</br></br></br>


--Query 10: API REJECTED DUE TO HEADER VALIDATION--</br>
SELECT COUNT(*) AS API_REJECTED_FOR_HEADER_VALIDATION</br>
FROM api_log.as501_log</br>
Where jsonb_typeof(default_validation) IN ('object')</br>
AND request_status = 3 -- failure</br>
AND data_ingestion_type_id = '1'</br>
AND EXTRACT(YEAR FROM added_on) = 2024</br>
AND EXTRACT(MONTH FROM added_on) = ${data};</br></br></br>

-- Query 11:Simulation Count</br>
select Count(lookup_log.id) as Simulation_Count</br>
from api_log.lookup_log</br>
where lookup_log.mode_id = 4 -- Simulation</br>
AND EXTRACT(YEAR FROM added_on) = 2024 </br>
AND EXTRACT(MONTH FROM added_on) = ${data};</br></br></br>
    `
    return q1
}
export {screenzaa,billr} 