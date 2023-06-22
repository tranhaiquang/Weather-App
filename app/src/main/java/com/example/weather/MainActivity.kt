package com.example.weather

import android.os.Bundle
import android.util.DisplayMetrics
import android.view.KeyEvent
import android.view.View
import android.view.Window
import android.widget.EditText
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.weather.databinding.ActivityMainBinding
import com.google.gson.Gson
import java.io.InputStreamReader
import java.net.URL
import javax.net.ssl.HttpsURLConnection


class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        requestWindowFeature(Window.FEATURE_NO_TITLE)
        getSupportActionBar()?.hide()


        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val btn_search = findViewById<ImageButton>(R.id.imageButtonSearch)
        val textViewCondition = findViewById<TextView>(R.id.textViewCondition)
        val editTextCity = findViewById<TextView>(R.id.textViewDay)
        val editTextInput = findViewById(R.id.inputEditText) as EditText
        val imageViewBackground = findViewById<ImageView>(R.id.imageViewBackground)
        fetchWeatherData("Vietnam").start()
        btn_search.setOnClickListener{
            var inputCity = editTextInput.text.toString()
            if (inputCity != null)
                fetchWeatherData(inputCity).start()
            else
                this@MainActivity.runOnUiThread(java.lang.Runnable {
                binding.textViewCelcius.text  = "No matching location found."})
        }

        editTextInput.setOnKeyListener(View.OnKeyListener { v, keyCode, event ->
            if (keyCode == KeyEvent.KEYCODE_ENTER) {
                var inputCity = editTextInput.text.toString()
                if (inputCity != null)
                    fetchWeatherData(inputCity).start()
                else
                    this@MainActivity.runOnUiThread(java.lang.Runnable {
                    binding.textViewCelcius.text  = "No matching location found."})
            }
            false
        })

    }

    private fun fetchWeatherData(city: String): Thread {
        return Thread {
            val key = "3d57b65857354e32b03152949231102"
            val url = URL("https://api.weatherapi.com/v1/current.json?key=3d57b65857354e32b03152949231102&q=$city&aqi=no")
            val connection = url.openConnection() as HttpsURLConnection

            if (connection.responseCode == 200) {
                val inputSystem = connection.inputStream
                val inputStreamReader = InputStreamReader(inputSystem, "UTF-8")
                val weather = Gson().fromJson(inputStreamReader, Weather::class.java)
                updateUI(weather)
                inputStreamReader.close()
                inputSystem.close()
            }
            else if (connection.responseCode == 400) {
                this@MainActivity.runOnUiThread(java.lang.Runnable {
                    this.binding.textViewCelcius.text  = "No matching location found."
                })
            }
            else {
                this@MainActivity.runOnUiThread(java.lang.Runnable {
                    this.binding.textViewCelcius.text  = "Failed Connection"
                })

            }

        }
    }

    private fun updateUI(weather: Weather) {
        runOnUiThread {
            kotlin.run {

                binding.textViewCelcius.text = weather.current.temp_c + "°C"
                binding.textViewCondition.text = weather.current.condition.text;
                binding.textViewDay.text = weather.location.localtime
                when {
                    binding.textViewCondition.text.contains("sunny") -> {
                        binding.imageViewBackground.setImageResource(R.drawable.sunny)
                        binding.inputEditText.setText(weather.location.name + ", " + weather.location.country)

                    }

                    binding.textViewCondition.text.contains("cloudy") -> {
                        if (weather.current.is_day == 1) {
                            binding.imageViewBackground.setImageResource(R.drawable.cloudy)
                        }
                        else {
                            binding.imageViewBackground.setImageResource(R.drawable.cloudy_night)
                        }

                    }

                    binding.textViewCondition.text.contains("partly cloudy") -> {
                        if (weather.current.is_day == 1) {
                            binding.imageViewBackground.setImageResource(R.drawable.partly_cloudy)
                        }
                        else {
                            binding.imageViewBackground.setImageResource(R.drawable.partly_cloudy_night)
                        }

                    }

                    binding.textViewCondition.text.contains("heavy rain") -> {
                        binding.imageViewBackground.setImageResource(R.drawable.heavy_rain)
                    }

                    binding.textViewCondition.text.contains("rain") -> {
                        binding.imageViewBackground.setImageResource(R.drawable.rain)
                    }

                    binding.textViewCondition.text.contains("thunder") -> {
                        binding.imageViewBackground.setImageResource(R.drawable.thunderstorm)
                    }

                    binding.textViewCondition.text.contains("snow") -> {
                        binding.imageViewBackground.setImageResource(R.drawable.snow)
                    }

                    binding.textViewCondition.text.contains("drizzle") -> {
                        binding.imageViewBackground.setImageResource(R.drawable.drizzle)
                    }

                    else -> {
                        binding.imageViewBackground.setImageResource(R.drawable.sunny)

                    }
                }



            }
        }
    }
}