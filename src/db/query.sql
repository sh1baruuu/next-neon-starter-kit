
DROP TABLE IF EXISTS registrations;

ALTER TABLE registrations
ADD COLUMN registration_no text GENERATED ALWAYS AS (
   'DCR-' || barangay_code || '-' || registration_year || '-' || lpad(control_no::text, 4, '0')
) STORED;

-- Create function to set control_no
CREATE OR REPLACE FUNCTION set_control_no()
RETURNS TRIGGER AS $$
DECLARE
      max_control_no INT;
BEGIN
      SELECT COALESCE(MAX(control_no), 0) + 1
      INTO max_control_no
      FROM registrations
      WHERE registration_year = NEW.registration_year;

      NEW.control_no := max_control_no;
      RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_set_control_no
BEFORE INSERT ON registrations
FOR EACH ROW
EXECUTE FUNCTION set_control_no();