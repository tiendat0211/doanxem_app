package com.sphoton.letsguess;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import com.google.firebase.analytics.FirebaseAnalytics;


public class MainActivity extends ReactActivity {

    private FirebaseAnalytics mFirebaseAnalytics;

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "DoanXem";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    mFirebaseAnalytics = FirebaseAnalytics.getInstance(this);
    super.onCreate(null);
  }
}
